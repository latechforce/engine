import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { getFirstAndSecondTableSchema } from '../../../test/common/schema'
import { getPostgresDatabase, teardownPostgres } from './PostgreSQLDriverTestSetup'
import type { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'
import { TableMapper } from '/adapter/api/mappers/TableMapper'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const {
    tables: [firstTableSchema, secondTableSchema],
  } = getFirstAndSecondTableSchema([
    'name',
    'multiple_linked_record',
    'number_rollup',
    'multiple_select',
    'single_select',
  ])
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
