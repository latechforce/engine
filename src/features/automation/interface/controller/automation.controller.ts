import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class AutomationController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listAutomationsUseCase = c.get('listAutomationsUseCase')
    const listAutomationsDto = await listAutomationsUseCase.execute(app)
    return c.json(listAutomationsDto)
  }

  static async trigger(
    c: Context<HonoType>,
    data: { automationIdOrPath: string; body: Record<string, unknown> }
  ) {
    const app = c.get('app')
    const automationIdOrPath = c.req.param('automationIdOrPath')
    const triggerHttpAutomationUseCase = c.get('triggerHttpAutomationUseCase')
    const triggerHttpAutomationDto = await triggerHttpAutomationUseCase.execute(
      app,
      automationIdOrPath,
      c.req.raw,
      data.body
    )
    return c.json(triggerHttpAutomationDto)
  }

  static async setStatus(c: Context<HonoType>, data: { automationId: string; active: boolean }) {
    const app = c.get('app')
    const setStatusUseCase = c.get('setStatusUseCase')
    await setStatusUseCase.execute(app, data.automationId, data.active)
    return c.text('OK')
  }

  static async get(c: Context<HonoType>, data: { automationId: string }) {
    const app = c.get('app')
    const getAutomationUseCase = c.get('getAutomationUseCase')
    const getAutomationDto = await getAutomationUseCase.execute(app, data.automationId)
    return c.json(getAutomationDto)
  }
}
