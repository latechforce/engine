import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

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
    const triggerHttpAutomationUseCase = c.get('triggerHttpAutomationUseCase')
    const triggerHttpAutomationDto = await triggerHttpAutomationUseCase.execute(
      app,
      paramPath,
      c.req.raw
    )
    return c.json(triggerHttpAutomationDto)
  }
}
