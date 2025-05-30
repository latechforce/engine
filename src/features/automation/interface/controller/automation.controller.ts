// Third-party imports
import type { Context } from 'hono'

// Shared imports
import type { HonoType } from '@/shared/infrastructure/service/server.service'

export class AutomationController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listAutomationsUseCase = c.get('listAutomationsUseCase')
    const listAutomationsDto = await listAutomationsUseCase.execute(app)
    return c.json(listAutomationsDto)
  }

  static async trigger(c: Context<HonoType>) {
    const app = c.get('app')
    const paramPath = c.req.param('path')
    const httpTriggeredUseCase = c.get('httpTriggeredUseCase')
    const httpTriggeredDto = await httpTriggeredUseCase.execute(app, paramPath, c.req.raw)
    return c.json(httpTriggeredDto)
  }
}
