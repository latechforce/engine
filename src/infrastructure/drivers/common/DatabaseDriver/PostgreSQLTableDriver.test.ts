import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { getPostgresDatabase, teardownPostgres } from './PostgreSQLDriverTestSetup'
import type { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'
import { TableMapper } from '/adapter/api/mappers/TableMapper'
import { configTableWithAllFields } from '/examples/config/table/withAllFields'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const [firstTableSchema, secondTableSchema] = configTableWithAllFields.tables!
  const firstTable = new PostgreSQLDatabaseTableDriver(
    TableMapper.toConfig(firstTableSchema),
    postgresDatabase.db
  )
  const secondTable = new PostgreSQLDatabaseTableDriver(
    TableMapper.toConfig(secondTableSchema),
    postgresDatabase.db
  )
  return { firstTable, secondTable }
}

const teardown = async () => {
  await postgresDatabase.disconnect()
  await teardownPostgres()
}

testDatabaseTableDriver(BunTester, setup, teardown)
