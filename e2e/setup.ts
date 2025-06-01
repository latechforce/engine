import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql'

export let container: StartedPostgreSqlContainer

async function globalSetup() {
  container = await new PostgreSqlContainer('postgres:16.9').start()

  // Save container info to be used in tests
  process.env.POSTGRES_HOST = container.getHost()
  process.env.POSTGRES_PORT = container.getPort().toString()
  process.env.POSTGRES_USERNAME = container.getUsername()
  process.env.POSTGRES_PASSWORD = container.getPassword()
}

export default globalSetup
