import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'

let container: StartedPostgreSqlContainer

export const setupPostgres = async (): Promise<string> => {
  container = await new PostgreSqlContainer()
    .withExposedPorts(5432)
    .withStartupTimeout(60000)
    .start()
  const url = container.getConnectionUri()
  return url
}

export const getPostgresDatabase = async (): Promise<PostgreSQLDatabaseDriver> => {
  const url = await setupPostgres()
  const postgresDatabase = new PostgreSQLDatabaseDriver({ url, driver: 'PostgreSQL' })
  await postgresDatabase.connect()
  return postgresDatabase
}

export const teardownPostgres = async () => {
  await container.stop()
}
