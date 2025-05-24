import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export class AutomationController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listAutomationsUseCase = c.get('listAutomationsUseCase')
    const automations = await listAutomationsUseCase.execute(app)
    return c.json(automations)
  }

  static async triggerHttp(c: Context<HonoType>) {
    const path = c.req.param('path')
    const app = c.get('app')
    const automation = app.automations.find(
      (automation) =>
        automation.trigger.schema.service === 'http' &&
        automation.trigger.schema.event === c.req.method.toLowerCase() &&
        (automation.trigger.schema.path === path || automation.trigger.schema.path === '/' + path)
    )
    if (!automation) return c.json({ error: 'Automation not found' }, 404)
    const triggerHttpUseCase = c.get('triggerHttpUseCase')
    const { data, error } = await triggerHttpUseCase.execute(automation, c.req.raw)
    if (error) return c.json({ error }, 400)
    if (typeof data === 'object') return c.json(data)
    return c.text('OK')
  }
}
