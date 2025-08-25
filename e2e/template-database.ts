import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as postgresSchema from '../src/shared/infrastructure/db/schema/postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEMPLATE_DB_NAME = 'e2e_template_db'

export async function createTemplateDatabase(connectionConfig: {
  host: string
  port: number
  user: string
  password: string
}) {
  const client = new Client({
    ...connectionConfig,
    database: 'postgres',
  })

  try {
    await client.connect()

    // Check if template database already exists
    const checkResult = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
      TEMPLATE_DB_NAME,
    ])

    if (checkResult.rows.length === 0) {
      console.log(`Creating new template database: ${TEMPLATE_DB_NAME}`)

      // Create the template database
      await client.query(`CREATE DATABASE "${TEMPLATE_DB_NAME}"`)

      // Connect to the template database to run migrations
      const templateClient = new Client({
        ...connectionConfig,
        database: TEMPLATE_DB_NAME,
      })

      await templateClient.connect()

      // Run migrations on the template database
      const db = drizzle(templateClient, { schema: postgresSchema })
      await migrate(db, {
        migrationsFolder: join(__dirname, '../src/shared/infrastructure/db/migrations/postgres'),
      })

      await templateClient.end()

      // Mark database as template (prevents accidental modifications)
      await client.query(`ALTER DATABASE "${TEMPLATE_DB_NAME}" WITH is_template = true`)

      console.log(`Template database ${TEMPLATE_DB_NAME} created with migrations applied`)
    } else {
      console.log(`Reusing existing template database: ${TEMPLATE_DB_NAME}`)
    }
  } finally {
    await client.end()
  }
}

export async function cloneTemplateDatabase(
  connectionConfig: {
    host: string
    port: number
    user: string
    password: string
  },
  targetDbName: string
) {
  const client = new Client({
    ...connectionConfig,
    database: 'postgres',
  })

  try {
    await client.connect()

    // Create new database from template
    await client.query(`CREATE DATABASE "${targetDbName}" WITH TEMPLATE "${TEMPLATE_DB_NAME}"`)
  } finally {
    await client.end()
  }
}

export async function dropTemplateDatabase(connectionConfig: {
  host: string
  port: number
  user: string
  password: string
}) {
  const client = new Client({
    ...connectionConfig,
    database: 'postgres',
  })

  try {
    await client.connect()

    // First, unmark as template to allow deletion
    await client.query(`ALTER DATABASE "${TEMPLATE_DB_NAME}" WITH is_template = false`)

    // Drop the template database
    await client.query(`DROP DATABASE IF EXISTS "${TEMPLATE_DB_NAME}"`)

    console.log(`Template database ${TEMPLATE_DB_NAME} dropped`)
  } catch (error) {
    console.error('Error dropping template database:', error)
  } finally {
    await client.end()
  }
}
