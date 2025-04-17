import type { Config } from '/src'
import App from '../src/bun'
import { join, relative } from 'path'
import { readdir } from 'fs/promises'

const searchTerm = process.argv[2]
const examplesDir = join(process.cwd(), 'examples')

async function findMatchingFile(dir: string): Promise<string | null> {
  // Ensure we're still within the examples directory
  if (!dir.startsWith(examplesDir)) {
    return null
  }

  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    // Skip node_modules directory
    if (entry.name === 'node_modules') {
      continue
    }

    if (entry.isDirectory()) {
      const found = await findMatchingFile(fullPath)
      if (found) return found
    } else if (entry.isFile() && entry.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return fullPath
    }
  }

  return null
}

const matchingFile = await findMatchingFile(examplesDir)

if (!matchingFile) {
  console.error(`No file found in examples directory containing "${searchTerm}"`)
  process.exit(1)
} else {
  console.log(`Running example: ${relative(examplesDir, matchingFile)}`)
}

export const config: Config = await import(matchingFile).then(
  (m) => m[matchingFile.split('/').pop()!.replace('.ts', '')]
)

await new App().start(config)
