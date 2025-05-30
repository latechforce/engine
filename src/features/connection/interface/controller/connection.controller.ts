import type { Context } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'

export class ConnectionController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listConnectionsUseCase = c.get('listConnectionsUseCase')
    const listConnectionsDto = await listConnectionsUseCase.execute(app)
    return c.json(listConnectionsDto)
  }

  static async authenticate(c: Context<HonoType>) {
    const id = c.req.query('id')
    const code = c.req.query('code')
    const app = c.get('app')
    const authenticateConnectionUseCase = c.get('authenticateConnectionUseCase')
    const html = await authenticateConnectionUseCase.execute(app, id, code)
    return c.html(html)
  }
}
