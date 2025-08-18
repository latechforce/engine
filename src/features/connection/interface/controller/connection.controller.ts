import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class ConnectionController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listConnectionsUseCase = c.get('listConnectionsUseCase')
    const listConnectionsDto = await listConnectionsUseCase.execute(app)
    return c.json(listConnectionsDto)
  }

  static async authenticate(c: Context<HonoType>, data: { code?: string; state?: string }) {
    const app = c.get('app')
    const authenticateConnectionUseCase = c.get('authenticateConnectionUseCase')
    const html = await authenticateConnectionUseCase.execute(app, data.code, data.state)
    return c.html(html)
  }

  static async disconnect(c: Context<HonoType>, data: { id: string }) {
    const app = c.get('app')
    const disconnectConnectionUseCase = c.get('disconnectConnectionUseCase')
    const connectionDto = await disconnectConnectionUseCase.execute(app, data.id)
    return c.json(connectionDto)
  }
}
