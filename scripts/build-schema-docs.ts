import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'fs'
import { join, basename, extname } from 'path'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

function isJSONSchema7(schema: JSONSchema7Definition): schema is JSONSchema7 {
  return typeof schema === 'object' && schema !== null && !Array.isArray(schema)
}

function removeSchemaSuffix(name: string): string {
  return name.replace(/Schema$/, '')
}

function generateMarkdownForDefinition(name: string, schema: JSONSchema7): string {
  let markdown = `# ${schema.title || removeSchemaSuffix(name)}\n\n`

  if (schema.description) {
    markdown += `${schema.description}\n\n`
  }

  // Add schema overview section
  markdown += '## Schema Overview\n\n'
  markdown += '| Property | Value |\n'
  markdown += '|----------|-------|\n'
  markdown += `| Type | \`${schema.type || 'any'}\` |\n`
  if (schema.format) {
    markdown += `| Format | \`${schema.format}\` |\n`
  }
  if (schema.default !== undefined) {
    markdown += `| Default | \`${JSON.stringify(schema.default).replace(/`/g, '\\`')}\` |\n`
  }
  if (schema.const !== undefined) {
    markdown += `| Const | \`${JSON.stringify(schema.const).replace(/`/g, '\\`')}\` |\n`
  }
  markdown += '\n'

  // Handle properties
  if (schema.properties) {
    markdown += '## Properties\n\n'
    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      if (isJSONSchema7(propSchema)) {
        const required = schema.required?.includes(propName) ? 'Yes' : 'No'
        let type = Array.isArray(propSchema.type)
          ? propSchema.type.join(' or ')
          : propSchema.type || 'any'

        // Handle $ref
        if (propSchema.$ref) {
          const refName = removeSchemaSuffix(propSchema.$ref.split('/').pop() || '')
          type = `[${refName}](http://localhost:3000/docs/${refName.toLowerCase()})`
        }

        markdown += `### ${propName}\n\n`
        markdown += '| Property | Value |\n'
        markdown += '|----------|-------|\n'
        markdown += `| Type | ${type} |\n`
        markdown += `| Required | ${required} |\n`

        if (propSchema.format) {
          markdown += `| Format | \`${propSchema.format}\` |\n`
        }
        if (propSchema.default !== undefined) {
          markdown += `| Default | \`${JSON.stringify(propSchema.default).replace(/`/g, '\\`')}\` |\n`
        }
        if (propSchema.const !== undefined) {
          markdown += `| Const | \`${JSON.stringify(propSchema.const).replace(/`/g, '\\`')}\` |\n`
        }
        if (propSchema.description) {
          markdown += `| Description | ${propSchema.description.replace(/\|/g, '\\|')} |\n`
        }
        markdown += '\n'

        // Add examples if available
        if (Array.isArray(propSchema.examples) && propSchema.examples.length > 0) {
          markdown += '#### Examples\n\n'
          propSchema.examples.forEach((example, index) => {
            const escapedExample = JSON.stringify(example, null, 2)
              .replace(/`/g, '\\`')
              .replace(/\|/g, '\\|')
            markdown += `Example ${index + 1}:\n\n\`\`\`json\n${escapedExample}\n\`\`\`\n\n`
          })
        }

        // Add enum values if available
        if (propSchema.enum) {
          markdown += '#### Enum Values\n\n'
          propSchema.enum.forEach((value) => {
            markdown += `- \`${value}\`\n`
          })
          markdown += '\n'
        }

        // Add pattern if available
        if (propSchema.pattern) {
          markdown += '#### Pattern\n\n'
          markdown += `\`${propSchema.pattern}\`\n\n`
        }

        // Add constraints if available
        const constraints = []
        if (propSchema.minimum !== undefined) constraints.push(`Minimum: \`${propSchema.minimum}\``)
        if (propSchema.maximum !== undefined) constraints.push(`Maximum: \`${propSchema.maximum}\``)
        if (propSchema.minLength !== undefined)
          constraints.push(`Min Length: \`${propSchema.minLength}\``)
        if (propSchema.maxLength !== undefined)
          constraints.push(`Max Length: \`${propSchema.maxLength}\``)
        if (propSchema.minItems !== undefined)
          constraints.push(`Min Items: \`${propSchema.minItems}\``)
        if (propSchema.maxItems !== undefined)
          constraints.push(`Max Items: \`${propSchema.maxItems}\``)
        if (propSchema.uniqueItems) constraints.push('Unique Items: `true`')

        if (constraints.length > 0) {
          markdown += '#### Constraints\n\n'
          constraints.forEach((constraint) => {
            markdown += `- ${constraint}\n`
          })
          markdown += '\n'
        }

        // Add anyOf if available
        if (propSchema.anyOf) {
          markdown += '#### Any Of\n\n'
          propSchema.anyOf.forEach((subSchema, index) => {
            if (isJSONSchema7(subSchema) && subSchema.$ref) {
              const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
              markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
            }
          })
          markdown += '\n'
        }

        // Add allOf if available
        if (propSchema.allOf) {
          markdown += '#### All Of\n\n'
          propSchema.allOf.forEach((subSchema, index) => {
            if (isJSONSchema7(subSchema) && subSchema.$ref) {
              const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
              markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
            }
          })
          markdown += '\n'
        }

        // Add oneOf if available
        if (propSchema.oneOf) {
          markdown += '#### One Of\n\n'
          propSchema.oneOf.forEach((subSchema, index) => {
            if (isJSONSchema7(subSchema) && subSchema.$ref) {
              const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
              markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
            }
          })
          markdown += '\n'
        }
      }
    })
  }

  // Handle additional properties
  if (schema.additionalProperties) {
    markdown += '## Additional Properties\n\n'
    markdown += '| Property | Value |\n'
    markdown += '|----------|-------|\n'
    if (typeof schema.additionalProperties === 'boolean') {
      markdown += `| Allowed | ${schema.additionalProperties ? 'Yes' : 'No'} |\n`
    } else if (isJSONSchema7(schema.additionalProperties)) {
      markdown += `| Type | \`${schema.additionalProperties.type || 'any'}\` |\n`
      if (schema.additionalProperties.description) {
        markdown += `| Description | ${schema.additionalProperties.description.replace(/\|/g, '\\|')} |\n`
      }
    }
    markdown += '\n'
  }

  // Handle pattern properties
  if (schema.patternProperties) {
    markdown += '## Pattern Properties\n\n'
    markdown += '| Pattern | Type | Description |\n'
    markdown += '|---------|------|-------------|\n'
    Object.entries(schema.patternProperties).forEach(([pattern, patternSchema]) => {
      if (isJSONSchema7(patternSchema)) {
        markdown += `| \`${pattern}\` | \`${patternSchema.type || 'any'}\` | ${patternSchema.description?.replace(/\|/g, '\\|') || ''} |\n`
      }
    })
    markdown += '\n'
  }

  // Handle enum values
  if (schema.enum) {
    markdown += '## Enum Values\n\n'
    schema.enum.forEach((value) => {
      markdown += `- \`${value}\`\n`
    })
    markdown += '\n'
  }

  // Handle anyOf
  if (schema.anyOf) {
    markdown += '## Any Of\n\n'
    schema.anyOf.forEach((subSchema, index) => {
      if (isJSONSchema7(subSchema) && subSchema.$ref) {
        const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
        markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
      }
    })
    markdown += '\n'
  }

  // Handle allOf
  if (schema.allOf) {
    markdown += '## All Of\n\n'
    schema.allOf.forEach((subSchema, index) => {
      if (isJSONSchema7(subSchema) && subSchema.$ref) {
        const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
        markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
      }
    })
    markdown += '\n'
  }

  // Handle oneOf
  if (schema.oneOf) {
    markdown += '## One Of\n\n'
    schema.oneOf.forEach((subSchema, index) => {
      if (isJSONSchema7(subSchema) && subSchema.$ref) {
        const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
        markdown += `${index + 1}. [${refName}](http://localhost:3000/docs/${refName.toLowerCase()})\n`
      }
    })
    markdown += '\n'
  }

  // Handle dependencies
  if (schema.dependencies) {
    markdown += '## Dependencies\n\n'
    Object.entries(schema.dependencies).forEach(([property, dependency]) => {
      markdown += `### If \`${property}\` is present\n\n`
      if (Array.isArray(dependency)) {
        markdown += 'The following properties are required:\n\n'
        dependency.forEach((dep) => {
          markdown += `- \`${dep}\`\n`
        })
      } else if (isJSONSchema7(dependency)) {
        markdown += 'The following schema must be satisfied:\n\n'
        markdown += '| Property | Value |\n'
        markdown += '|----------|-------|\n'
        markdown += `| Type | \`${dependency.type || 'any'}\` |\n`
        if (dependency.description) {
          markdown += `| Description | ${dependency.description.replace(/\|/g, '\\|')} |\n`
        }
      }
      markdown += '\n'
    })
  }

  return markdown
}

interface SchemaFile {
  name: string
  parents: string[]
  path: string
  isDirectory: boolean
  children?: SchemaFile[]
}

function getSchemaFiles(dir: string, parents: string[] = []): SchemaFile[] {
  const files = readdirSync(dir)
  return files.map((file) => {
    const fullPath = join(dir, file)
    const stats = statSync(fullPath)
    const isDirectory = stats.isDirectory()
    const name = removeSchemaSuffix(basename(file, extname(file)))
    return {
      name,
      parents,
      path: fullPath,
      isDirectory,
      children: isDirectory ? getSchemaFiles(fullPath, [name, ...parents]) : undefined,
    }
  })
}

function main() {
  try {
    // Read the schema file
    const schemaPath = join(process.cwd(), 'schema', 'config.schema.json')
    const schemaContent = readFileSync(schemaPath, 'utf-8')
    const schema = JSON.parse(schemaContent)

    // Create docs directory if it doesn't exist
    const docsDir = join(process.cwd(), 'website', 'docs')

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
          try {
            const definitionName =
              (file.name !== 'index' ? file.name + file.parents.join('') : file.parents.join('')) +
              'Schema'
            const definitionSchema = schema.definitions[definitionName]
            const integrationsMarkdown = generateMarkdownForDefinition(
              definitionName,
              definitionSchema
            )
            writeFileSync(join(basePath, `${file.name}.md`), integrationsMarkdown)
            console.log(`Processing schema file: ${file.path.replace(schemasDir, '')}`)
          } catch (error) {
            console.error(`Error processing schema file ${file.path}:`, error)
          }
        }
      }
    }
    processSchemaFiles(schemaFiles, docsDir)

    console.log('Documentation generation completed successfully!')
  } catch (error) {
    console.error('Error generating documentation:', error)
    process.exit(1)
  }
}

main()
