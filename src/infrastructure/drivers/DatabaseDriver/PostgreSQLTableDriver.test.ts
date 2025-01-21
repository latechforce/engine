import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { getFirstAndSecondTableConfig } from '@test/config'
import { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'

let container: StartedPostgreSqlContainer

const setup = async () => {
  // GIVEN
  container = await new PostgreSqlContainer().start()
  const url = container.getConnectionUri()
  const postgresDatabase = new PostgreSQLDatabaseDriver({ url, driver: 'PostgreSQL' })
  await postgresDatabase.connect()
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
  await container.stop()
}

testDatabaseTableDriver(BunTester, setup, teardown)
