import type { AppSchema } from '@/types'
import App from '@/app'
import { join, relative } from 'path'
import { readdir } from 'fs/promises'
import { mockServer, type Handlers } from './mock'

const searchTerm = process.argv[2]
const examplesDir = join(process.cwd(), 'example')

async function findMatchingFiles(dir: string): Promise<string[]> {
  // If no search term is provided, return the default example
  if (!searchTerm) {
    return []
  }

  // Ensure we're still within the examples directory
  if (!dir.startsWith(examplesDir)) {
    return []
  }

  const entries = await readdir(dir, { withFileTypes: true })
  const matches: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    // Skip node_modules directory
    if (entry.name === 'node_modules') {
      continue
    }

    if (entry.isDirectory()) {
      const found = await findMatchingFiles(fullPath)
      matches.push(...found)
    } else if (entry.isFile() && fullPath.toLowerCase().includes(searchTerm.toLowerCase())) {
      matches.push(fullPath)
    }
  }

  return matches
}

if (searchTerm) {
  const matchingFiles = await findMatchingFiles(examplesDir)

  if (matchingFiles.length === 0) {
    console.error(`No file found in examples directory containing "${searchTerm}"`)
    process.exit(1)
  }

  // Prioritize index files
  const indexFile = matchingFiles.find((file) => file.toLowerCase().includes('index'))
  const selectedFile = indexFile || matchingFiles[0]

  if (!selectedFile) {
    console.error('No valid example file found')
    process.exit(1)
  }

  const externals = await import(selectedFile).then((m) => {
    if (m.externals) {
      return m.externals
    }
    return {}
  })

  const handlers: Handlers = await import(selectedFile).then((m) => {
    if (m.handlers) {
      return m.handlers
    }
    return undefined
  })

  if (handlers && process.env.MOCK === '*') {
    await mockServer(handlers)
  }

  const schema: AppSchema = await import(selectedFile).then((m) => m.default)

  console.log(
    `Running example/${relative(examplesDir, selectedFile)}${
      process.env.MOCK === '*' ? ` with mock` : ''
    }\n--------------------------------`
  )

  await new App({ externals }).start(schema)
} else {
  await new App().start()
}
