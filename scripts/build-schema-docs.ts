import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'fs'
import { join, basename, extname } from 'path'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

function isJSONSchema7(schema: JSONSchema7Definition): schema is JSONSchema7 {
  return typeof schema === 'object' && schema !== null && !Array.isArray(schema)
}

function removeSchemaSuffix(name: string): string {
  return name.replace(/Schema$/, '')
}

function findSchemaFile(ref: string, schemaFiles: SchemaFile[]): SchemaFile | undefined {
  for (const file of schemaFiles) {
    if (removeSchemaSuffix(file.ref) === ref) {
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

function generateMarkdownForDefinition(
  ref: string,
  schema: JSONSchema7,
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

  markdown += `# ${schema.title || removeSchemaSuffix(ref)}\n\n`

  if (schema.description) {
    markdown += `${schema.description}\n\n`
  }

  // Handle properties
  if (schema.properties) {
    markdown += '## Properties\n\n'
    markdown += '| Property | Type | Required | Const | Description |\n'
    markdown += '|----------|------|----------|-------|-------------|\n'

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      if (isJSONSchema7(propSchema)) {
        const required = schema.required?.includes(propName) ? 'Yes' : 'No'
        const constValue =
          propSchema.const !== undefined
            ? `\`${JSON.stringify(propSchema.const).replace(/`/g, '\\`')}\``
            : ''
        let type = Array.isArray(propSchema.type)
          ? propSchema.type.join(' or ')
          : propSchema.type || 'any'

        // Handle $ref
        if (propSchema.$ref) {
          const refName = removeSchemaSuffix(propSchema.$ref.split('/').pop() || '')
          const file = findSchemaFile(refName, schemaFiles)
          type = `[${refName}](/${file.docsPath})`
        }

        // Add format if available
        if (propSchema.format) {
          type += ` (${propSchema.format})`
        }

        // Add default value if available
        if (propSchema.default !== undefined) {
          type += `\n\nDefault: \`${JSON.stringify(propSchema.default).replace(/`/g, '\\`')}\``
        }

        // Add enum values if available
        if (propSchema.enum) {
          type += `\n\nEnum: ${propSchema.enum.map((v) => `\`${v}\``).join(', ')}`
        }

        // Add constraints if available
        const constraints = []
        if (propSchema.minimum !== undefined) constraints.push(`Min: ${propSchema.minimum}`)
        if (propSchema.maximum !== undefined) constraints.push(`Max: ${propSchema.maximum}`)
        if (propSchema.minLength !== undefined)
          constraints.push(`Min Length: ${propSchema.minLength}`)
        if (propSchema.maxLength !== undefined)
          constraints.push(`Max Length: ${propSchema.maxLength}`)
        if (propSchema.minItems !== undefined) constraints.push(`Min Items: ${propSchema.minItems}`)
        if (propSchema.maxItems !== undefined) constraints.push(`Max Items: ${propSchema.maxItems}`)
        if (propSchema.uniqueItems) constraints.push('Unique Items')

        if (constraints.length > 0) {
          type += `\n\nConstraints: ${constraints.join(', ')}`
        }

        // Add anyOf/allOf/oneOf if available
        if (propSchema.anyOf || propSchema.allOf || propSchema.oneOf) {
          const refs = []
          if (propSchema.anyOf) refs.push(...propSchema.anyOf)
          if (propSchema.allOf) refs.push(...propSchema.allOf)
          if (propSchema.oneOf) refs.push(...propSchema.oneOf)

          const refNames = refs
            .filter((s): s is JSONSchema7 => isJSONSchema7(s) && !!s.$ref)
            .map((s) => {
              const refName = removeSchemaSuffix(s.$ref!.split('/').pop() || '')
              const file = findSchemaFile(refName, schemaFiles)
              return `[${refName}](/${file.docsPath})`
            })

          if (refNames.length > 0) {
            type += `\n\nComposed of: ${refNames.join(', ')}`
          }
        }

        const description = propSchema.description
          ? propSchema.description.replace(/\|/g, '\\|')
          : ''
        markdown += `| ${propName} | ${type} | ${required} | ${constValue} | ${description} |\n`
      }
    })
    markdown += '\n'
  }

  // Handle anyOf
  if (schema.anyOf) {
    markdown += '## Any Of\n\n'
    schema.anyOf.forEach((subSchema, index) => {
      if (isJSONSchema7(subSchema) && subSchema.$ref) {
        const refName = removeSchemaSuffix(subSchema.$ref.split('/').pop() || '')
        const file = findSchemaFile(refName, schemaFiles)
        markdown += `${index + 1}. [${refName}](/${file.docsPath})\n`
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
        const file = findSchemaFile(refName, schemaFiles)
        markdown += `${index + 1}. [${refName}](/${file.docsPath})\n`
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
        const file = findSchemaFile(refName, schemaFiles)
        markdown += `${index + 1}. [${refName}](/${file.docsPath})\n`
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

  // Add schema examples if available
  if (Array.isArray(schema.examples) && schema.examples.length > 0) {
    markdown += '## Examples\n\n'
    schema.examples.forEach((example, index) => {
      const escapedExample = JSON.stringify(example, null, 2)
        .replace(/`/g, '\\`')
        .replace(/\|/g, '\\|')
      markdown += `Example ${index + 1}:\n\n\`\`\`json\n${escapedExample}\n\`\`\`\n\n`
    })
  }

  return markdown
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

function getSchemaFiles(dir: string, parents: string[] = []): SchemaFile[] {
  const files = readdirSync(dir)
  return files.map((file) => {
    const fullPath = join(dir, file)
    const stats = statSync(fullPath)
    const isDirectory = stats.isDirectory()
    const name = removeSchemaSuffix(basename(file, extname(file)))
    const ref = (name !== 'index' ? name + parents.join('') : parents.join('')) + 'Schema'
    const docsPath = join('docs', [...parents].reverse().join('/'), name !== 'index' ? name : '')
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
