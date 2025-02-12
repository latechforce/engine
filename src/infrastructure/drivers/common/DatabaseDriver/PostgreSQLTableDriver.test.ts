import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { getFirstAndSecondTableConfig } from '../../../test/config'
import { getPostgresDatabase, teardownPostgres } from './PostgreSQLDriverTestSetup'
import type { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const {
    tables: [firstTableConfig, secondTableConfig],
  } = getFirstAndSecondTableConfig([
    'name',
    'multiple_linked_record',
    'number_rollup',
    'multiple_select',
  ])
  const firstTable = new PostgreSQLDatabaseTableDriver(firstTableConfig, postgresDatabase.db)
  const secondTable = new PostgreSQLDatabaseTableDriver(secondTableConfig, postgresDatabase.db)
  return { firstTable, secondTable }
}

const teardown = async () => {
  await postgresDatabase.disconnect()
  await teardownPostgres()
}

testDatabaseTableDriver(BunTester, setup, teardown)
