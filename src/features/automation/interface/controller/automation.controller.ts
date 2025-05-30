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
    const paramPath = c.req.param('path')
    const app = c.get('app')
    const automation = app.automations.find(({ trigger }) => {
      if (trigger.path === paramPath) {
        if (trigger.schema.service === 'http') {
          return c.req.method.toLowerCase() === trigger.schema.event.toLowerCase()
        }
        return true
      }
      return false
    })
    if (!automation) return c.json({ error: 'Automation not found' }, 404)
    const httpTriggeredUseCase = c.get('httpTriggeredUseCase')
    const { data, error } = await httpTriggeredUseCase.execute(automation, c.req.raw)
    if (error) return c.json({ error }, 400)
    if (data) return c.json({ data })
    return c.text('OK')
  }
}
