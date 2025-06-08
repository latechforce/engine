import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { createServer } from 'http'

export let container: StartedPostgreSqlContainer
export let testServer: ReturnType<typeof createServer>

async function globalSetup() {
  container = await new PostgreSqlContainer('postgres:16.9').start()

  // Save container info to be used in tests
  process.env.POSTGRES_HOST = container.getHost()
  process.env.POSTGRES_PORT = container.getPort().toString()
  process.env.POSTGRES_USERNAME = container.getUsername()
  process.env.POSTGRES_PASSWORD = container.getPassword()

  // Test server
  testServer = createServer(async (req, res) => {
    const { url, method, headers } = req
    let body = ''
    for await (const chunk of req) {
      body += chunk
    }
    let json = null
    try {
      json = JSON.parse(body)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      json = null
    }
    const response = JSON.stringify(
      {
        url,
        method,
        headers,
        body,
        json,
      },
      null,
      2
    )
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(response)
  })
  await new Promise<void>((resolve) => {
    testServer.listen(6000, resolve)
  })
}

export default globalSetup
