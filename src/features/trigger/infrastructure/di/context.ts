// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'

// Trigger application imports
import type { TriggerHttpAutomationUseCase } from '@/trigger/application/use-case/trigger-http-automation.use-case'
import TYPES from '../../application/di/types'

export type TriggerHonoContextType = {
  triggerHttpAutomationUseCase: TriggerHttpAutomationUseCase
}

@injectable()
export class TriggerHonoContext {
  constructor(
    @inject(TYPES.UseCase.Http)
    private readonly triggerHttpAutomationUseCase: TriggerHttpAutomationUseCase
  ) {}

  setVariables(c: Context) {
    c.set('triggerHttpAutomationUseCase', this.triggerHttpAutomationUseCase)
  }
}
