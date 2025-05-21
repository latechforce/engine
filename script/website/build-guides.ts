import { readdir, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { existsSync } from 'fs'
import type { AppSchema } from '@/types'
import prettier from 'prettier'
import type { Options } from 'prettier'

interface Guide {
  title: string
  description: string
  category: string
  path: string
  code: string
}

const prettierConfig: Options = {
  parser: 'typescript',
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
}

function replaceLast(str: string, pattern: RegExp, replacement: string) {
  const matches = [...str.matchAll(pattern)]
  if (matches.length === 0) return str

  const lastMatch = matches[matches.length - 1]
  if (!lastMatch) return str

  const start = lastMatch.index
  const end = start + lastMatch[0].length

  return str.slice(0, start) + replacement + str.slice(end)
}

function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

function generateGuideCard(guide: Guide): string {
  return `
    <Link to="/guides/${guide.path}">
      <p style={{ fontSize: '1.2rem', fontWeight: '400', color: 'var(--ifm-color-primary)', margin: 0 }}>${guide.description}</p>
    </Link>
  `
}

function generateCategorySection(category: string, guides: Guide[]): string {
  return `
  <div>
    <h2 id="${category.toLowerCase()}">${formatCategoryName(category)}</h2>
    <hr style={{ 
      margin: '0.5rem 0',
      border: 'none',
      borderTop: '1px solid var(--ifm-color-emphasis-200)'
    }} />
    <div>
      ${guides.map(generateGuideCard).join('\n')}
    </div>
  </div>
  `
}

function generateBreadcrumb(guide: Guide): string {
  return `
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>
  <Link to="/guides">Guides</Link>
  <span>/</span>
  <Link to="/guides#${guide.category.toLowerCase()}">${formatCategoryName(guide.category)}</Link>
  <span>/</span>
</div>
  `
}

async function getAllFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      if (entry.name.endsWith('index.ts') || fullPath.includes('example/env')) {
        files.push(fullPath)
      } else {
        const file = await import(fullPath)
        if (file.inGuides) {
          files.push(fullPath)
        }
      }
    }
  }

  return files
}

async function generateGuideFromExample(filePath: string): Promise<Guide> {
  const file = await import(filePath)
  const relativePath = filePath.replace(process.cwd(), '').replace(/^\/example\//, '')
  const category = filePath.match(/(?<=example\/)[^/]+/)?.[0] || 'uncategorized'
  const { name, description, ...schema }: AppSchema = file.default

  const isTypescript = filePath.includes('typescript')
  const isExternals = filePath.includes('externals')
  const isInputData = filePath.includes('input-data')

  const envCode = file.env
    ? `
  process.env = ${JSON.stringify(file.env, null, 2)}
  `
    : ''

  const externalsCode = file.externals
    ? `
  const externals = ${JSON.stringify(
    file.externals,
    (key, value) => {
      if (typeof value === 'function') {
        return value.toString()
      }
      return value
    },
    2
  )}
  `
    : ''

  const code = `
  import { App, type AppSchema ${isTypescript && (isExternals || isInputData) ? ', type CodeContext' : ''} } from '@latechforce/engine'

  ${envCode}
  ${externalsCode}

  const schema: AppSchema = ${JSON.stringify(schema, null, 2)}

  await new App(${isExternals ? '{ externals }' : ''} ).start(schema)`

  let visualCode = replaceLast(code, / }"/g, '})')
    .replace(/"\(\) => {/g, '() => {')
    .replace(/"function\(\) {/g, 'String(function() {')
    .replace(/"function\(context\) {/g, 'String(function(context) {')
    .replace(/ }"/g, '}')
    .replace(/\\n/g, '')
    .replace(/\\"/g, '"')

  if (isTypescript && isInputData) {
    visualCode = visualCode.replace(
      /function\(context\)/g,
      'function(context: CodeContext<{ name: string }>)'
    )
  }

  if (isTypescript && isExternals) {
    visualCode = visualCode.replace(
      /function\(context\)/g,
      'function(context: CodeContext<{}, typeof externals>)'
    )
  }

  // Format the code using Prettier
  const formattedCode = await prettier.format(visualCode, prettierConfig)

  // Extract title from filename (convert kebab-case to Title Case)
  const title = name || 'Untitled'

  return {
    title,
    description: description ?? `Guide for ${title}`,
    category,
    path: relativePath.replace('.ts', '').replace('/index', ''),
    code: formattedCode.trim(),
  }
}

async function generateGuidePage(guide: Guide, outputDir: string, allGuides: Guide[]) {
  const otherGuides = allGuides.filter((g) => g.path !== guide.path)
  const categories = [...new Set(otherGuides.map((g) => g.category))]

  const mdxContent = `---
title: ${guide.title}
description: ${guide.description}
category: ${guide.category}
---

import Link from '@docusaurus/Link'

${generateBreadcrumb(guide)}

# ${guide.title}

${guide.description}

\`\`\`typescript
${guide.code}
\`\`\`

<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '120px' }}>
${categories
  .map((category) =>
    generateCategorySection(
      category,
      otherGuides.filter((g) => g.category === category)
    )
  )
  .join('\n')}
</div>
`

  const outputPath = join(outputDir, `${guide.path}.mdx`)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, mdxContent)
}

async function generateIndexPage(guides: Guide[], outputDir: string) {
  const categories = [...new Set(guides.map((g) => g.category))]

  const mdxContent = `---
title: Guides
---

import Link from '@docusaurus/Link'

# Guides

A collection of code samples and walkthroughs for configuring and using LTF Engine.

<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
${categories
  .map((category) =>
    generateCategorySection(
      category,
      guides.filter((g) => g.category === category)
    )
  )
  .join('\n')}
</div>
`

  await writeFile(join(outputDir, 'index.mdx'), mdxContent)
}

async function main() {
  const exampleDir = join(process.cwd(), 'example')
  const outputDir = join(process.cwd(), 'website/src/pages/guides')

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
  }

  // Get all example files
  const files = await getAllFiles(exampleDir)

  // Generate guides
  const guides = await Promise.all(files.map(generateGuideFromExample))

  // Generate individual guide pages
  await Promise.all(guides.map((guide) => generateGuidePage(guide, outputDir, guides)))

  // Generate index page
  await generateIndexPage(guides, outputDir)

  console.log('Guides generated successfully!')
}

main().catch(console.error)
