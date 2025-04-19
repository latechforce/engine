import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  readdirSync,
  statSync,
  existsSync,
} from 'fs'
import { join, basename, extname } from 'path'
import fg from 'fast-glob'

const files = await fg(['src/adapter/api/schemas/**/*.ts'], { absolute: true })

for (const file of files) {
  await import(`file://${file}`)
}

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
  title: string
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
  if (Array.isArray(schema.type)) return schema.type.map((t) => `\`${t}\``).join(' or ')
  if (schema.type === 'array' && schema.items) {
    if (typeof schema.items === 'object' && '$ref' in schema.items) {
      const ref = (schema.items.$ref as string).split('/').pop()
      if (!ref) {
        throw new Error('Ref is undefined')
      }
      const file = findSchemaFile(ref, schemaFiles)
      if (file) {
        return `[${file.title}](${file.docsPath})[]`
      }
      return `[${ref}](#)[]`
    } else {
      return `${formatType(schema.items as JSONSchema, schemaFiles)}[]`
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
      return `[${file.title}](${file.docsPath})`
    }
    return `${ref}`
  }
  if (schema.anyOf) return 'anyOf'
  if (schema.oneOf) return 'oneOf'
  return `\`${schema.type || 'unknown'}\``
}

async function findExample(file: SchemaFile, key: string): Promise<string> {
  const parents = [...file.parents]
    .reverse()
    .filter((p) => p !== 'config')
    .join('/')
  let examplePath = join(process.cwd(), 'examples', 'config', parents, file.name, `${key}.ts`)
  if (!existsSync(examplePath)) {
    examplePath = join(process.cwd(), 'examples', parents, file.name, `${key}.ts`)
    if (!existsSync(examplePath)) {
      examplePath = join(process.cwd(), 'examples', 'config', parents, `${key}.ts`)
      if (!existsSync(examplePath)) {
        return ''
      }
    }
  }
  const example = await import(examplePath).then((m) => m[Object.keys(m)[0]])
  return `\`\`\`ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = ${JSON.stringify(example, null, 2)}

await new App().start(config)
\`\`\`
`
}

async function generateMarkdownForDefinition(
  ref: string | null,
  schema: JSONSchema,
  schemaFiles: SchemaFile[]
): Promise<string> {
  let markdown = ''
  let sidebarPosition = 0
  const file = ref ? findSchemaFile(ref, schemaFiles) : null

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
  markdown += `# ${schema.title}\n\n`

  // Description
  if (schema.description) {
    markdown += `${schema.description}\n\n`
  }

  if (file) {
    markdown += await findExample(file, 'index')
  }

  if (schema.default) {
    markdown += `The default configuration is:\n\n`
    markdown += `\`\`\`json\n`
    markdown += `${JSON.stringify(schema.default, null, 2)}\n`
    markdown += `\`\`\`\n\n`
  }

  if (schema.properties) {
    const requiredProperties = schema.required || []
    const optionalProperties = Object.keys(schema.properties).filter(
      (key) => !requiredProperties.includes(key)
    )
    if (requiredProperties.length > 0) {
      markdown += `## Required\n\n`
      for (const key of requiredProperties) {
        const prop = schema.properties?.[key]
        if (prop) {
          markdown += `### ${prop.title || key}\n\n`
          if (prop.description) {
            markdown += `${prop.description}\n`
          }
          if (prop.default !== undefined) {
            markdown += `The default value is ${prop.default}.\n`
          }
          markdown += `>${key}: ${formatType(prop, schemaFiles)}\n\n`
        }
      }
    }
    if (optionalProperties.length > 0) {
      markdown += `## Optional\n\n`
      for (const key of optionalProperties) {
        const prop = schema.properties?.[key]
        if (prop) {
          markdown += `### ${prop.title || key}\n\n`
          if (prop.description) {
            markdown += `${prop.description}\n`
          }
          if (prop.default !== undefined) {
            markdown += `The default value is ${prop.default}.\n`
          }
          markdown += `>${key}?: ${formatType(prop, schemaFiles)}\n\n`
          if (file) {
            markdown += await findExample(file, key)
          }
        }
      }
    }
  }

  if (schema.anyOf) {
    markdown += `## Any of\n\n`
    for (const choice of schema.anyOf) {
      const ref = choice.$ref?.split('/').pop()
      if (ref) {
        const file = findSchemaFile(ref, schemaFiles)
        if (file) {
          markdown += `- [${file.title}](${file.docsPath})\n\n`
        }
      }
    }
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
      title: name,
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

async function main() {
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

  const processSchemaFiles = async (schemaFiles: SchemaFile[], basePath: string) => {
    for (const file of schemaFiles) {
      if (file.isDirectory) {
        // Create a subdirectory in docs for this schema type
        const docsSubDir = join(basePath, file.name)
        mkdirSync(docsSubDir, { recursive: true })

        if (file.children) {
          await processSchemaFiles(file.children, docsSubDir)
        }
      } else {
        const definitionSchema = schema.definitions[file.ref]
        if (!definitionSchema) {
          throw new Error(`Definition ${file.ref} not found in schema`)
        }
        const integrationsMarkdown = await generateMarkdownForDefinition(
          file.ref,
          definitionSchema,
          schemaFiles
        )
        writeFileSync(join(basePath.toLowerCase(), `${file.name}.md`), integrationsMarkdown)
      }
    }
  }
  await processSchemaFiles(schemaFiles, docsDir)

  console.log('Documentation generation completed successfully!')
}

await import('./build-schema')
await main()
