import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'
import type { ListRunsParams } from '../../../run/domain/repository-interface/run-repository.interface'

export class AutomationController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listAutomationsUseCase = c.get('listAutomationsUseCase')
    const listAutomationsDto = await listAutomationsUseCase.execute(app)
    return c.json(listAutomationsDto)
  }

  static async trigger(
    c: Context<HonoType>,
    data: {
      automationIdOrPath: string
      body: Record<string, unknown> | Record<string, unknown>[]
      formId?: string
    }
  ) {
    const app = c.get('app')
    const automationIdOrPath = c.req.param('automationIdOrPath')
    const triggerHttpAutomationUseCase = c.get('triggerHttpAutomationUseCase')
    const triggerHttpAutomationDto = await triggerHttpAutomationUseCase.execute(
      app,
      automationIdOrPath,
      c.req.raw,
      data.body,
      data.formId
    )
    if (triggerHttpAutomationDto.headers) {
      const body =
        typeof triggerHttpAutomationDto.body === 'string'
          ? triggerHttpAutomationDto.body
          : JSON.stringify(triggerHttpAutomationDto.body)
      return new Response(body, {
        status: 200,
        headers: triggerHttpAutomationDto.headers,
      })
    }
    return c.json(triggerHttpAutomationDto.body)
  }

  static async setStatus(c: Context<HonoType>, data: { automationId: string; active: boolean }) {
    const app = c.get('app')
    const setStatusUseCase = c.get('setStatusUseCase')
    const result = await setStatusUseCase.execute(app, data.automationId, data.active)
    if (result?.error) {
      return c.json({ error: result.error }, 400)
    }
    return c.text('OK')
  }

  static async get(c: Context<HonoType>, data: { automationId: string; params: ListRunsParams }) {
    const app = c.get('app')
    const getAutomationUseCase = c.get('getAutomationUseCase')
    const getAutomationDto = await getAutomationUseCase.execute(app, data.automationId, data.params)
    return c.json(getAutomationDto)
  }
}
