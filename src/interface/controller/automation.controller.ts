import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export class AutomationController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listAutomationsUseCase = c.get('listAutomationsUseCase')
    const automations = await listAutomationsUseCase.execute(app)
    return c.json(automations)
  }

  static async trigger(c: Context<HonoType>) {
    const paramPath = c.req.param('path')
    const app = c.get('app')
    const automation = app.automations.find((automation) => {
      const { service, event, path } = automation.trigger.schema
      return (
        ((service === 'http' && event === c.req.method.toLowerCase()) || service !== 'http') &&
        (path === paramPath || path === '/' + paramPath)
      )
    })
    if (!automation) return c.json({ error: 'Automation not found' }, 404)
    const httpTriggeredUseCase = c.get('httpTriggeredUseCase')
    const { data, error } = await httpTriggeredUseCase.execute(automation, c.req.raw)
    if (error) return c.json({ error }, 400)
    if (typeof data === 'object') return c.json(data)
    return c.text('OK')
  }
}
