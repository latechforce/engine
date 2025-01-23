import BunTester from 'bun:test'
import { testDatabaseDriver } from '@infrastructure/drivers/common/DatabaseDriver/DatabaseDriverTest'
import { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'

let container: StartedPostgreSqlContainer

const setup = async () => {
  container = await new PostgreSqlContainer().start()
  const url = container.getConnectionUri()
  const postgresDatabase = new PostgreSQLDatabaseDriver({ url, driver: 'PostgreSQL' })
  await postgresDatabase.connect()
  return new PostgreSQLDatabaseDriver({ url, driver: 'PostgreSQL' })
}

const teardown = async () => {
  await container.stop()
}

testDatabaseDriver(BunTester, setup, teardown)
