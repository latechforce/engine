import { resolve } from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { createGenerator, Config } from 'ts-json-schema-generator'
import { unlinkSync, readdirSync } from 'fs-extra'
import { statSync } from 'fs'
import { removeSync } from 'fs-extra'

interface SchemaDefinition {
  [key: string]: unknown
  definitions?: Record<string, unknown>
  $ref?: string
  properties?: Record<string, SchemaDefinition>
  items?: SchemaDefinition | SchemaDefinition[]
}

const config: Config = {
  path: resolve(process.cwd(), 'src/domain/interfaces/index.ts'),
  tsconfig: resolve(process.cwd(), 'tsconfig.json'),
  type: 'Config',
  expose: 'export',
  jsDoc: 'extended',
  topRef: true,
  skipTypeCheck: true,
  strictTuples: true,
  sortProps: false,
}

function getSchemaPath(name: string): string[] {
  // Field types
  if (name.endsWith('Field')) {
    return ['IField']
  }

  // Action types
  if (name.includes('Action')) {
    // Integration-specific actions
    const integrations = [
      'Airtable',
      'Calendly',
      'GoCardless',
      'GoogleMail',
      'Notion',
      'Pappers',
      'Phantombuster',
      'Qonto',
    ]

    for (const integration of integrations) {
      if (name.includes(integration)) {
        return ['IAction', 'integrations']
      }
    }

    // Service-specific actions
    const services = ['Database', 'Javascript', 'Typescript']
    for (const service of services) {
      if (name.includes(service)) {
        return ['IAction', 'services']
      }
    }

    return ['IAction']
  }

  // Trigger types
  if (name.includes('Trigger')) {
    // Integration-specific triggers
    const integrations = ['Calendly', 'Notion']
    for (const integration of integrations) {
      if (name.includes(integration)) {
        return ['ITrigger', 'integrations']
      }
    }

    // Service-specific triggers
    const services = ['Database', 'Http', 'Schedule']
    for (const service of services) {
      if (name.includes(service)) {
        return ['ITrigger', 'services']
      }
    }

    return ['ITrigger']
  }

  // For files directly in the interfaces directory
  const topLevelInterfaces = [
    'IIntegrations',
    'IForm',
    'IBucket',
    'IAutomation',
    'ITable',
    'Config',
    'InputConfig',
  ]

  if (topLevelInterfaces.includes(name)) {
    return []
  }

  // Config files should be in the root
  if (name.endsWith('Config')) {
    return []
  }

  // Default to root if no specific path is found
  return []
}

function updateRefs(
  schema: SchemaDefinition,
  definitionName: string,
  folderPath: string[]
): SchemaDefinition {
  const updatedSchema = { ...schema }

  if (updatedSchema.$ref) {
    const refName = updatedSchema.$ref.split('/').pop() || ''
    if (refName && refName !== definitionName) {
      const refPath = getSchemaPath(refName).join('/')
      // Keep the I prefix in the filename
      updatedSchema.$ref = `./${refPath ? refPath + '/' : ''}${refName}.schema.json`
    }
  }

  for (const [key, value] of Object.entries(updatedSchema)) {
    if (Array.isArray(value)) {
      updatedSchema[key] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? updateRefs(item as SchemaDefinition, definitionName, folderPath)
          : item
      )
    } else if (typeof value === 'object' && value !== null) {
      updatedSchema[key] = updateRefs(value as SchemaDefinition, definitionName, folderPath)
    }
  }

  return updatedSchema
}

function createSchemaFiles(schema: SchemaDefinition, outputDir: string) {
  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  } else {
    // Delete all files in the output directory
    const files = readdirSync(outputDir)
    for (const file of files) {
      const filePath = resolve(outputDir, file)
      const stats = statSync(filePath)
      if (stats.isDirectory()) {
        removeSync(filePath)
      } else {
        unlinkSync(filePath)
      }
    }
  }

  // Create a map of definitions
  const definitions = schema.definitions || {}

  // Write the main schema file
  const mainSchema = { ...schema }
  delete mainSchema.definitions
  const updatedMainSchema = updateRefs(mainSchema, 'Config', [])
  writeFileSync(
    resolve(outputDir, 'Config.schema.json'),
    JSON.stringify(updatedMainSchema, null, 2)
  )

  // Write each definition to a separate file in its appropriate folder
  for (const [name, definition] of Object.entries(definitions)) {
    if (typeof definition === 'object' && definition !== null) {
      const folderPath = getSchemaPath(name)
      const fileName = `${name}.schema.json` // Keep the I prefix in filenames
      const filePath =
        folderPath.length > 0
          ? resolve(outputDir, ...folderPath, fileName)
          : resolve(outputDir, fileName)

      // Create necessary directories
      const dirPath = resolve(filePath, '..')
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })
      }

      const updatedDefinition = updateRefs(definition as SchemaDefinition, name, folderPath)
      writeFileSync(filePath, JSON.stringify(updatedDefinition, null, 2))
    }
  }
}

try {
  console.log('Generating JSON schema...')

  const generator = createGenerator(config)
  const schema = generator.createSchema(config.type) as unknown as SchemaDefinition

  const outputDir = resolve(process.cwd(), 'schema')
  createSchemaFiles(schema, outputDir)

  console.log('Schema files generated successfully!')
} catch (error) {
  console.error('Error generating schema:', error)
  process.exit(1)
}
