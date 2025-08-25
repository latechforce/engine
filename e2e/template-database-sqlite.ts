import { join } from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

const TEMPLATE_SQLITE_PATH = join(process.cwd(), 'tmp', 'e2e_template.db')

export async function createSqliteTemplateDatabase() {
  // Ensure tmp directory exists
  const tmpDir = join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }

  // Check if template already exists
  if (fs.existsSync(TEMPLATE_SQLITE_PATH)) {
    console.log(`Reusing existing SQLite template database: ${TEMPLATE_SQLITE_PATH}`)
    return
  }

  console.log(`Creating new SQLite template database: ${TEMPLATE_SQLITE_PATH}`)

  // Create a temporary script to run migrations with Bun
  const migrationScript = `
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { join } from 'path'
import * as sqliteSchema from '../src/shared/infrastructure/db/schema/sqlite'

const db = drizzle('${TEMPLATE_SQLITE_PATH}', {
  schema: sqliteSchema,
})

migrate(db, {
  migrationsFolder: join(__dirname, '../src/shared/infrastructure/db/migrations/sqlite'),
})

console.log('SQLite migrations completed')
`

  const scriptPath = join(tmpDir, 'migrate-sqlite.ts')
  fs.writeFileSync(scriptPath, migrationScript)

  // Run the migration script with Bun
  await new Promise<void>((resolve, reject) => {
    const proc = spawn('bun', ['run', scriptPath], {
      cwd: process.cwd(),
      stdio: 'inherit',
    })

    proc.on('close', (code) => {
      // Clean up the temporary script
      fs.unlinkSync(scriptPath)

      if (code === 0) {
        console.log(`SQLite template database created with migrations applied`)
        resolve()
      } else {
        reject(new Error(`Migration script exited with code ${code}`))
      }
    })

    proc.on('error', (err) => {
      fs.unlinkSync(scriptPath)
      reject(err)
    })
  })
}

export function cloneSqliteTemplateDatabase(targetPath: string) {
  // Ensure the template exists
  if (!fs.existsSync(TEMPLATE_SQLITE_PATH)) {
    throw new Error(`SQLite template database not found at ${TEMPLATE_SQLITE_PATH}`)
  }

  // Ensure target directory exists
  const targetDir = join(process.cwd(), 'tmp')
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // Copy the template database to the target path
  fs.copyFileSync(TEMPLATE_SQLITE_PATH, targetPath)
}

export function dropSqliteTemplateDatabase() {
  if (fs.existsSync(TEMPLATE_SQLITE_PATH)) {
    try {
      fs.unlinkSync(TEMPLATE_SQLITE_PATH)
      console.log(`SQLite template database dropped`)
    } catch (error) {
      console.error('Error dropping SQLite template database:', error)
    }
  }
}
