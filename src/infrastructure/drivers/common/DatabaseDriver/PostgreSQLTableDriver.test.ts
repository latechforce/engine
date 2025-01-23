import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { getFirstAndSecondTableConfig } from '@test/config'
import { setupPostgres, teardownPostgres } from './PostgreSQLDriverTestSetup'

const setup = async () => {
  const postgresDatabase = await setupPostgres()
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

testDatabaseTableDriver(BunTester, setup, teardownPostgres)
