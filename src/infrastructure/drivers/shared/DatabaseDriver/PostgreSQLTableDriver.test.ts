import pg from 'pg'
import BunTester from 'bun:test'
import type { IDatabaseTableDriver } from '@adapter/spi/drivers/DatabaseTableSpi'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'

let container: StartedPostgreSqlContainer

const setup = async (): Promise<IDatabaseTableDriver> => {
  // GIVEN
  container = await new PostgreSqlContainer().start()
  const url = container.getConnectionUri()
  const db = new pg.Pool({ connectionString: url })
  const NUMERIC_OID = 1700
  db.on('error', () => {})
  db.on('connect', (client) => {
    client.on('error', () => {})
    client.setTypeParser(NUMERIC_OID, (value) => parseFloat(value))
  })
  const postgreSQLTable = new PostgreSQLDatabaseTableDriver(
    {
      name: 'table_1',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
      ],
    },
    db
  )
  await db.connect()
  return postgreSQLTable
}

const teardown = async () => {
  await container.stop()
}

testDatabaseTableDriver(BunTester, setup, teardown)
