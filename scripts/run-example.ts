import type { Config } from '/src'
import App from '../src/bun'
import { join, relative } from 'path'
import { readdir } from 'fs/promises'

const searchTerm = process.argv[2]
const examplesDir = join(process.cwd(), 'examples')

async function findMatchingFiles(dir: string): Promise<string[]> {
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

const matchingFiles = await findMatchingFiles(examplesDir)

if (matchingFiles.length === 0) {
  console.error(`No file found in examples directory containing "${searchTerm}"`)
  process.exit(1)
}

// Prioritize index files
const indexFile = matchingFiles.find((file) => file.toLowerCase().includes('index'))
const selectedFile = indexFile || matchingFiles[0]

console.log(`Running example: ${relative(examplesDir, selectedFile)}`)

export const config: Config = await import(selectedFile).then((m) => m[Object.keys(m)[0]])

await new App().start(config)
