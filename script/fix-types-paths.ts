import path from 'path'
import fs from 'fs-extra'

const OUTPUT_DIR = path.resolve(process.cwd(), 'dist')
const ALIAS_MAP = {
  '/domain/': path.resolve(OUTPUT_DIR, 'domain') + '/',
  '/adapter/': path.resolve(OUTPUT_DIR, 'adapter') + '/',
  '/infrastructure/': path.resolve(OUTPUT_DIR, 'infrastructure') + '/',
}

function replaceAliasesWithRelativePaths(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8')

  for (const [alias, absolutePath] of Object.entries(ALIAS_MAP)) {
    const relativePath = path.relative(path.dirname(filePath), absolutePath)
    // Convert Windows paths to POSIX (replace backslashes with slashes)
    let posixRelativePath = relativePath.split(path.sep).join('/')
    if (posixRelativePath.search(/^\./) === -1) posixRelativePath = './' + posixRelativePath
    const regex = new RegExp(alias, 'g')
    content = content.replace(regex, posixRelativePath + '/')
  }

  fs.writeFileSync(filePath, content)
}

function processDirectory(directory: string) {
  fs.readdirSync(directory).forEach((item) => {
    const itemPath = path.join(directory, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      // If it's a directory, process it recursively
      processDirectory(itemPath)
    } else if (item.endsWith('.js') || item.endsWith('.d.ts')) {
      // If it's a .js or .d.ts file, replace the aliases with relative paths
      replaceAliasesWithRelativePaths(itemPath)
    }
  })
}

function isEmptyExport(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8').trim()
  const cleanedContent = content
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove single/multi-line comments
    .replace(/\s+/g, '') // Remove all whitespace
  return cleanedContent === 'export{};'
}

function removeUnwantedFiles(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder not found: ${folderPath}`)
    return
  }
  const files = fs.readdirSync(folderPath)
  files.forEach((file) => {
    const filePath = path.join(folderPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      removeUnwantedFiles(filePath) // Recursively check subfolders
    } else if (file.endsWith('.test.d.ts') || file.endsWith('.test.d.ts.map')) {
      fs.unlinkSync(filePath)
    } else if (file.endsWith('.d.ts') && isEmptyExport(filePath)) {
      fs.unlinkSync(filePath)
    }
  })
}

removeUnwantedFiles(OUTPUT_DIR)
processDirectory(OUTPUT_DIR)
