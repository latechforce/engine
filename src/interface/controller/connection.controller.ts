import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export class ConnectionController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listConnectionsUseCase = c.get('listConnectionsUseCase')
    const connections = await listConnectionsUseCase.execute(app)
    return c.json(connections)
  }

  static async authenticate(c: Context<HonoType>) {
    const id = c.req.query('id')
    const code = c.req.query('code')
    if (!id || !code) {
      return c.json({ error: 'Missing id or code' }, 400)
    }
    const app = c.get('app')
    const connection = app.connections.find((connection) => connection.schema.id === Number(id))
    if (!connection) {
      return c.json({ error: 'Connection not found' }, 404)
    }
    const authenticateConnectionUseCase = c.get('authenticateConnectionUseCase')
    await authenticateConnectionUseCase.execute(connection, code)
    return c.html(`
      <html>
        <body>
          <script>
            // Notify opener window and close this one
            if (window.opener) {
              window.opener.postMessage('oauth:success', '*')
              window.close()
            } else {
              document.body.innerText = 'You can close this window.'
            }
          </script>
        </body>
      </html>
    `)
  }
}
