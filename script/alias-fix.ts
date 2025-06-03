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

      // Function to check if import is from external package
      const isExternalPackage = (importPath: string) => {
        // Skip if path starts with . or @
        if (importPath.startsWith('.') || importPath.startsWith('@')) {
          return false
        }
        // Check if it's a node module (no / in the first part of the path)
        return !importPath.includes('/') || importPath.startsWith('@')
      }

      // Function to convert import path to relative path
      const convertToRelativePath = (importPath: string, currentFilePath: string) => {
        // Skip external packages
        if (isExternalPackage(importPath)) {
          return importPath
        }

        // Remove @/ prefix if present
        const cleanPath = importPath.replace('@/', '')

        // Get the directory of the current file
        const currentDir = path.dirname(currentFilePath)

        // Construct the absolute path of the imported file
        const absoluteImportPath = path.resolve('./src', cleanPath)

        // Get the relative path from current file to imported file
        const relativePath = path.relative(currentDir, absoluteImportPath)

        // Ensure the path starts with ./
        return relativePath.startsWith('.') ? relativePath : `./${relativePath}`
      }

      // Replace @/ imports
      content = content.replace(/@\/([a-zA-Z0-9_/.-]+)/g, (match, importPath) => {
        return convertToRelativePath(importPath, fullPath)
      })

      // Replace regular imports that might need relative paths
      content = content.replace(/from ['"]([^'"]+)['"]/g, (match, importPath) => {
        if (importPath.startsWith('.') || importPath.startsWith('@')) {
          return match // Skip already relative paths or @ imports (handled above)
        }
        return `from '${convertToRelativePath(importPath, fullPath)}'`
      })

      await fs.writeFile(fullPath, content)
    }
  }
}

await fixAliases('./src')
