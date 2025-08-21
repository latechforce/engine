// Third-party imports
import type { Context } from 'hono'

// Trigger application imports
import type { TriggerHttpAutomationUseCase } from '../../application/use-case/trigger-http-automation.use-case'

export type TriggerHonoContextType = {
  triggerHttpAutomationUseCase: TriggerHttpAutomationUseCase
}

export class TriggerHonoContext {
  constructor(private readonly triggerHttpAutomationUseCase: TriggerHttpAutomationUseCase) {}

  setVariables(c: Context) {
    c.set('triggerHttpAutomationUseCase', this.triggerHttpAutomationUseCase)
  }
}
