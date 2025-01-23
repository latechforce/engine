import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'

let container: StartedPostgreSqlContainer

export const setupPostgres = async (): Promise<PostgreSQLDatabaseDriver> => {
  container = await new PostgreSqlContainer().withExposedPorts(5432).start()
  const url = container.getConnectionUri()
  const postgresDatabase = new PostgreSQLDatabaseDriver({ url, driver: 'PostgreSQL' })
  await postgresDatabase.connect()
  return postgresDatabase
}

export const teardownPostgres = async () => {
  await container.stop()
}
