// scripts/alias-fix.ts
import fs from 'node:fs/promises'
import path from 'node:path'

async function fixAliases(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await fixAliases(fullPath)
    } else if (entry.name.endsWith('.ts')) {
      let content = await fs.readFile(fullPath, 'utf8')
      content = content.replace(/@\/([a-zA-Z0-9_/.-]+)/g, './$1')
      await fs.writeFile(fullPath, content)
    }
  }
}

await fixAliases('./src')
