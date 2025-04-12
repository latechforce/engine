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

  // Helper function to replace $ref with actual definition
  const replaceRefWithDefinition = (obj: SchemaDefinition): SchemaDefinition => {
    // Handle direct $ref
    if (obj.$ref) {
      const refKey = obj.$ref.replace('#/definitions/', '')
      // Replace all non-Schema definitions
      if (!refKey.endsWith('Schema')) {
        const refDefinition = merged.definitions[refKey] as SchemaDefinition
        if (refDefinition) {
          // Mark the definition for removal
          definitionsToRemove.add(refKey)

          const { $ref, ...rest } = obj
          // Recursively process the referenced definition
          const processedDefinition = replaceRefWithDefinition(refDefinition)
          return {
            ...processedDefinition,
            ...rest,
          }
        }
      }
    }

    // Recursively process properties and items
    if (obj.properties) {
      const processedProperties: Record<string, SchemaDefinition | { type: string }> = {}
      Object.entries(obj.properties).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const propertyValue = value as SchemaDefinition
          // Handle property that is a direct reference
          if (propertyValue.$ref) {
            const refKey = propertyValue.$ref.replace('#/definitions/', '')
            if (!refKey.endsWith('Schema')) {
              const refDefinition = merged.definitions[refKey] as SchemaDefinition
              if (refDefinition) {
                // Mark the definition for removal
                definitionsToRemove.add(refKey)
                // Recursively process the referenced definition
                const processedDefinition = replaceRefWithDefinition(refDefinition)
                processedProperties[key] = {
                  ...processedDefinition,
                  ...propertyValue,
                }
                // Remove $ref only if it was merged and doesn't end with Schema
                delete processedProperties[key].$ref
                return
              }
            }
          }
          processedProperties[key] = replaceRefWithDefinition(propertyValue)
        } else {
          processedProperties[key] = { type: value as string }
        }
      })
      obj.properties = processedProperties
    }

    if (obj.items) {
      if (Array.isArray(obj.items)) {
        obj.items = obj.items.map((item) =>
          typeof item === 'object' && item !== null
            ? replaceRefWithDefinition(item as SchemaDefinition)
            : item
        )
      } else if (typeof obj.items === 'object' && obj.items !== null) {
        obj.items = replaceRefWithDefinition(obj.items as SchemaDefinition)
      }
    }

    // Handle anyOf, oneOf, allOf arrays
    if (obj.anyOf && Array.isArray(obj.anyOf)) {
      obj.anyOf = obj.anyOf.map((item: unknown) =>
        typeof item === 'object' && item !== null
          ? replaceRefWithDefinition(item as SchemaDefinition)
          : item
      )
    }
    if (obj.oneOf && Array.isArray(obj.oneOf)) {
      obj.oneOf = obj.oneOf.map((item: unknown) =>
        typeof item === 'object' && item !== null
          ? replaceRefWithDefinition(item as SchemaDefinition)
          : item
      )
    }
    if (obj.allOf && Array.isArray(obj.allOf)) {
      obj.allOf = obj.allOf.map((item: unknown) =>
        typeof item === 'object' && item !== null
          ? replaceRefWithDefinition(item as SchemaDefinition)
          : item
      )
    }

    return obj
  }

  // First pass: Process the root schema
  if (merged.$ref) {
    const refKey = merged.$ref.replace('#/definitions/', '')
    if (refKey.endsWith('Schema')) {
      const rootSchema = merged.definitions[refKey] as SchemaDefinition
      if (rootSchema) {
        // Process the root schema's properties
        rootSchema.properties = replaceRefWithDefinition(rootSchema).properties
        merged.definitions[refKey] = rootSchema
      }
    }
  }

  // Second pass: Find all Schema definitions
  Object.entries(merged.definitions).forEach(([key, value]) => {
    if (key.endsWith('Schema') && typeof value === 'object' && value !== null) {
      const schemaDef = value as SchemaDefinition
      const configKey = key.replace('Schema', 'Config')

      // Get the corresponding Config definition
      const configDef = merged.definitions[configKey] as SchemaDefinition | undefined

      if (configDef) {
        // Mark the Config definition for removal
        definitionsToRemove.add(configKey)

        // Remove the $ref property
        delete schemaDef.$ref

        // Merge properties from Config into Schema
        Object.entries(configDef).forEach(([propKey, propValue]) => {
          if (propKey !== '$ref') {
            schemaDef[propKey] = propValue
          }
        })

        // Replace any $ref in the schema definition with actual definitions
        schemaDef.properties = replaceRefWithDefinition(schemaDef).properties

        // Update the definition
        merged.definitions[key] = schemaDef
      }

      // Process all properties in the schema definition even if there's no Config
      if (schemaDef.properties) {
        schemaDef.properties = replaceRefWithDefinition(schemaDef).properties
      }
    }
  })

  // Third pass: Process IntegrationsSchema and its nested references
  const integrationsSchema = merged.definitions['IntegrationsSchema'] as
    | SchemaDefinition
    | undefined
  if (integrationsSchema) {
    if (integrationsSchema.properties) {
      integrationsSchema.properties = replaceRefWithDefinition(integrationsSchema).properties
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
