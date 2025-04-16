import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'fs'
import { capitalize } from 'lodash'
import { join, basename, extname } from 'path'

interface JSONSchema {
  title?: string
  description?: string
  type?: string | string[]
  properties?: Record<string, JSONSchema>
  required?: string[]
  enum?: string[]
  const?: string
  items?: JSONSchema | { $ref: string }
  anyOf?: JSONSchema[]
  oneOf?: JSONSchema[]
  $ref?: string
  default?: unknown
  examples?: unknown[]
  definitions?: Record<string, JSONSchema>
}

interface SchemaFile {
  name: string
  parents: string[]
  path: string
  ref: string
  isDirectory: boolean
  children?: SchemaFile[]
  docsPath: string
}

function removeSchemaSuffix(name: string): string {
  return name.replace(/Schema$/, '')
}

function findSchemaFile(ref: string, schemaFiles: SchemaFile[]): SchemaFile | undefined {
  for (const file of schemaFiles) {
    if (file.ref === ref) {
      return file
    }
    if (file.children) {
      const child = findSchemaFile(ref, file.children)
      if (child) {
        return child
      }
    }
  }
  return undefined
}

function formatType(schema: JSONSchema, schemaFiles: SchemaFile[]): string {
  if (schema.enum) return `enum: ${schema.enum.map((e) => `\`${e}\``).join(', ')}`
  if (schema.const) return `const: \`${schema.const}\``
  if (Array.isArray(schema.type)) return schema.type.join(' or ')
  if (schema.type === 'array' && schema.items) {
    if (typeof schema.items === 'object' && '$ref' in schema.items) {
      const ref = (schema.items.$ref as string).split('/').pop()
      if (!ref) {
        throw new Error('Ref is undefined')
      }
      const file = findSchemaFile(ref, schemaFiles)
      if (file) {
        return `Array of [${capitalize(file.name)}](${file.docsPath})`
      }
      return `Array of [${ref}](#)`
    } else {
      return `Array&lt;${formatType(schema.items as JSONSchema, schemaFiles)}&gt;`
    }
  }
  if (schema.type === 'object') return 'Object'
  if (schema.$ref) {
    const ref = (schema.$ref as string).split('/').pop()
    if (!ref) {
      throw new Error('Ref is undefined')
    }
    const file = findSchemaFile(ref, schemaFiles)
    if (file) {
      return `Reference: [${capitalize(file.name)}](${file.docsPath})`
    }
    return `Reference: ${ref}`
  }
  if (schema.anyOf) return 'anyOf'
  if (schema.oneOf) return 'oneOf'
  return schema.type || 'unknown'
}

function generateMarkdownForDefinition(
  ref: string,
  schema: JSONSchema,
  schemaFiles: SchemaFile[]
): string {
  let markdown = ''
  let sidebarPosition = 0

  switch (schema.title) {
    case 'Config':
      sidebarPosition = 1
      break
    case 'Form':
      sidebarPosition = 2
      break
    case 'Automation':
      sidebarPosition = 3
      break
    case 'Table':
      sidebarPosition = 4
      break
    case 'Bucket':
      sidebarPosition = 5
      break
    case 'Integrations':
      sidebarPosition = 6
      break
    default:
      break
  }

  if (sidebarPosition > 0) {
    markdown += `---
sidebar_position: ${sidebarPosition}
---

`
  }

  // Title
  markdown += `# ${schema.title || 'Config Schema'}\n\n`

  // Description
  if (schema.description) {
    markdown += `## Description\n\n${schema.description}\n\n`
  }

  // Default
  if (schema.default !== undefined) {
    markdown += `## Default\n\n\`\`\`json\n${JSON.stringify(schema.default, null, 2)}\n\`\`\`\n\n`
  }

  // Properties
  if (schema.properties) {
    markdown += `## Properties\n\n`
    markdown += `| Name | Type | Required | Description |\n`
    markdown += `|------|------|----------|-------------|\n`

    for (const [key, prop] of Object.entries(schema.properties)) {
      const type = formatType(prop, schemaFiles)
      const required = schema.required?.includes(key) ? '✔' : ''
      const description = prop.description || ''

      markdown += `| ${key} | ${type} | ${required} | ${description} |\n`
    }
    markdown += '\n'

    // Add detailed documentation for anyOf, oneOf, and object types in a separate section
    const complexProperties = Object.entries(schema.properties).filter(([_, prop]) => {
      if (prop.$ref) {
        const ref = prop.$ref.split('/').pop()
        if (!ref) {
          throw new Error('Ref is undefined')
        }
        const definition = schema.definitions?.[ref]
        return (
          definition &&
          (definition.anyOf ||
            definition.oneOf ||
            (definition.type === 'object' && definition.properties))
        )
      }
      return prop.anyOf || prop.oneOf || (prop.type === 'object' && prop.properties)
    })

    console.log(complexProperties)

    if (complexProperties.length > 0) {
      markdown += `## Property Details\n\n`

      for (const [key, prop] of complexProperties) {
        markdown += `### ${key}\n\n`

        let currentSchema = prop
        if (prop.$ref) {
          const ref = prop.$ref.split('/').pop()
          if (!ref) {
            throw new Error('Ref is undefined')
          }
          currentSchema = schema.definitions?.[ref] || prop
        }

        if (currentSchema.anyOf || currentSchema.oneOf) {
          const choices = currentSchema.anyOf || currentSchema.oneOf
          markdown += `This property can be one of the following options:\n\n`
          if (!choices) {
            throw new Error('Choices are undefined')
          }
          for (const choice of choices) {
            if (choice.$ref) {
              const ref = choice.$ref.split('/').pop()
              if (!ref) {
                throw new Error('Ref is undefined')
              }
              const file = findSchemaFile(ref, schemaFiles)
              if (file) {
                markdown += `#### Option: [${capitalize(file.name)}](${file.docsPath})\n\n`
              } else {
                markdown += `#### Option: ${ref}\n\n`
              }
            } else if (choice.type === 'object' && choice.properties) {
              markdown += `#### Option: Object\n\n`
              markdown += `| Property | Type | Required | Description |\n`
              markdown += `|----------|------|----------|-------------|\n`

              for (const [propKey, propValue] of Object.entries(choice.properties)) {
                const propType = formatType(propValue, schemaFiles)
                const propRequired = choice.required?.includes(propKey) ? '✔' : ''
                const propDescription = propValue.description || ''
                markdown += `| ${propKey} | ${propType} | ${propRequired} | ${propDescription} |\n`
              }
              markdown += '\n'
            }
          }
        } else if (currentSchema.type === 'object' && currentSchema.properties) {
          markdown += `| Property | Type | Required | Description |\n`
          markdown += `|----------|------|----------|-------------|\n`

          for (const [propKey, propValue] of Object.entries(currentSchema.properties)) {
            const propType = formatType(propValue, schemaFiles)
            const propRequired = currentSchema.required?.includes(propKey) ? '✔' : ''
            const propDescription = propValue.description || ''
            markdown += `| ${propKey} | ${propType} | ${propRequired} | ${propDescription} |\n`
          }
          markdown += '\n'
        }
      }
    }
  }

  // Example
  if (schema.examples && schema.examples.length > 0) {
    markdown += `## Example\n\n\`\`\`json\n${JSON.stringify(schema.examples[0], null, 2)}\n\`\`\`\n`
  }

  return markdown
}

function getSchemaFiles(dir: string, parents: string[] = []): SchemaFile[] {
  const files = readdirSync(dir)
  return files.map((file) => {
    const fullPath = join(dir, file)
    const stats = statSync(fullPath)
    const isDirectory = stats.isDirectory()
    const name = removeSchemaSuffix(basename(file, extname(file)))
    const ref = (name !== 'index' ? name + parents.join('') : parents.join('')) + 'Schema'
    const docsPath =
      '/' + join('api', [...parents].reverse().join('/'), name !== 'index' ? name : '')
    return {
      name: name.toLowerCase(),
      ref,
      parents,
      path: fullPath,
      isDirectory,
      docsPath: docsPath.toLowerCase(),
      children: isDirectory ? getSchemaFiles(fullPath, [name, ...parents]) : undefined,
    }
  })
}

// Read the schema file

function main() {
  const schemaPath = join(process.cwd(), 'schema', 'config.schema.json')
  const schemaContent = readFileSync(schemaPath, 'utf-8')
  const schema = JSON.parse(schemaContent)

  // Create docs directory if it doesn't exist
  const docsDir = join(process.cwd(), 'website', 'version', 'latest', 'api')

  // Clear the docs directory if it exists
  try {
    rmSync(docsDir, { recursive: true, force: true })
  } catch {
    // Ignore error if directory doesn't exist
  }

  // Create fresh docs directory
  mkdirSync(docsDir, { recursive: true })

  // Process schema files from the schemas directory
  const schemasDir = join(process.cwd(), 'src', 'adapter', 'api', 'schemas')
  const schemaFiles = getSchemaFiles(schemasDir)

  const processSchemaFiles = (schemaFiles: SchemaFile[], basePath: string) => {
    for (const file of schemaFiles) {
      if (file.isDirectory) {
        // Create a subdirectory in docs for this schema type
        const docsSubDir = join(basePath, file.name)
        mkdirSync(docsSubDir, { recursive: true })

        if (file.children) {
          processSchemaFiles(file.children, docsSubDir)
        }
      } else {
        const definitionSchema = schema.definitions[file.ref]
        if (!definitionSchema) {
          throw new Error(`Definition ${file.ref} not found in schema`)
        }
        const integrationsMarkdown = generateMarkdownForDefinition(
          file.ref,
          definitionSchema,
          schemaFiles
        )
        writeFileSync(join(basePath.toLowerCase(), `${file.name}.md`), integrationsMarkdown)
        console.log(`Processing schema file: ${file.path.replace(schemasDir, '')}`)
      }
    }
  }
  processSchemaFiles(schemaFiles, docsDir)

  console.log('Documentation generation completed successfully!')
}

main()
