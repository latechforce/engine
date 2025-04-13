import { resolve } from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { createGenerator, type Config } from 'ts-json-schema-generator'
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

const SCHEMAS_DIR = resolve(process.cwd(), 'src/adapter/api/schemas')
const OUTPUT_DIR = resolve(process.cwd(), 'schema')

function mergeSchemaWithConfig(schema: SchemaDefinition): SchemaDefinition {
  const merged: SchemaDefinition & { definitions: Record<string, unknown> } = {
    ...schema,
    definitions: schema.definitions ? { ...schema.definitions } : {},
  }
  const definitionsToRemove = new Set<string>()
  const processedDefinitions = new Set<string>()

  // Helper function to process any object recursively
  const processObject = (obj: unknown): unknown => {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => processObject(item))
    }

    const schemaObj = obj as SchemaDefinition

    // Handle $ref
    if (schemaObj.$ref) {
      const refKey = schemaObj.$ref.replace('#/definitions/', '')
      if (!refKey.endsWith('Schema')) {
        const refDefinition = merged.definitions[refKey] as SchemaDefinition
        if (refDefinition) {
          definitionsToRemove.add(refKey)
          if (!processedDefinitions.has(refKey)) {
            processedDefinitions.add(refKey)
            const { $ref, ...rest } = schemaObj
            const processedDefinition = processObject(refDefinition) as SchemaDefinition
            return {
              ...processedDefinition,
              ...rest,
            }
          }
          const { $ref, ...rest } = schemaObj
          return rest
        }
      }
    }

    // Process properties
    if (schemaObj.properties) {
      const processedProperties: Record<string, SchemaDefinition> = {}
      Object.entries(schemaObj.properties).forEach(([key, value]) => {
        processedProperties[key] = processObject(value) as SchemaDefinition
      })
      schemaObj.properties = processedProperties
    }

    // Process items
    if (schemaObj.items) {
      if (Array.isArray(schemaObj.items)) {
        schemaObj.items = schemaObj.items.map((item) => processObject(item)) as SchemaDefinition[]
      } else {
        schemaObj.items = processObject(schemaObj.items) as SchemaDefinition
      }
    }

    // Process anyOf, oneOf, allOf
    if (schemaObj.anyOf && Array.isArray(schemaObj.anyOf)) {
      schemaObj.anyOf = schemaObj.anyOf.map((item) => processObject(item)) as SchemaDefinition[]
    }
    if (schemaObj.oneOf && Array.isArray(schemaObj.oneOf)) {
      schemaObj.oneOf = schemaObj.oneOf.map((item) => processObject(item)) as SchemaDefinition[]
    }
    if (schemaObj.allOf && Array.isArray(schemaObj.allOf)) {
      schemaObj.allOf = schemaObj.allOf.map((item) => processObject(item)) as SchemaDefinition[]
    }

    // Process additionalProperties
    if (schemaObj.additionalProperties) {
      schemaObj.additionalProperties = processObject(
        schemaObj.additionalProperties
      ) as SchemaDefinition
    }

    return schemaObj
  }

  // Process all definitions
  Object.entries(merged.definitions).forEach(([key, value]) => {
    if (key.endsWith('Schema') && typeof value === 'object' && value !== null) {
      merged.definitions[key] = processObject(value)
    }
  })

  // Process root schema
  if (merged.$ref) {
    const refKey = merged.$ref.replace('#/definitions/', '')
    if (refKey.endsWith('Schema')) {
      const rootSchema = merged.definitions[refKey] as SchemaDefinition
      if (rootSchema) {
        merged.definitions[refKey] = processObject(rootSchema)
      }
    }
  }

  // Remove all non-Schema definitions that were merged
  definitionsToRemove.forEach((key) => {
    delete merged.definitions[key]
  })

  return merged
}

function createSchemaFile() {
  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  } else {
    // Delete all files in the output directory
    const files = readdirSync(OUTPUT_DIR)
    for (const file of files) {
      const filePath = resolve(OUTPUT_DIR, file)
      const stats = statSync(filePath)
      if (stats.isDirectory()) {
        removeSync(filePath)
      } else {
        unlinkSync(filePath)
      }
    }
  }

  const config: Config = {
    path: resolve(SCHEMAS_DIR, 'ConfigSchema.ts'),
    tsconfig: resolve(process.cwd(), 'tsconfig.json'),
    type: 'ConfigSchema',
    expose: 'export',
    jsDoc: 'extended',
    topRef: true,
    skipTypeCheck: true,
    strictTuples: true,
    sortProps: false,
    additionalProperties: false,
  }

  try {
    // First, generate the schema using ts-json-schema-generator
    const generator = createGenerator(config)
    const schema = generator.createSchema(config.type) as unknown as SchemaDefinition

    // Apply the schema merging
    const mergedSchema = mergeSchemaWithConfig(schema)

    const fileName = 'config.schema.json'
    const filePath = resolve(OUTPUT_DIR, fileName)

    // Write the merged schema
    writeFileSync(filePath, JSON.stringify(mergedSchema, null, 2))
    console.log('Generated merged config.schema.json')
  } catch (error) {
    console.error('Error generating config.schema.json:', error)
    process.exit(1)
  }
}

try {
  console.log('Generating config.schema.json...')
  createSchemaFile()
} catch (error) {
  console.error('Error generating schema:', error)
  process.exit(1)
}
