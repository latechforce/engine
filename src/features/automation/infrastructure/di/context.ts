// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'

// Automation application imports
import type { ListAutomationsUseCase } from '@/automation/application/use-case/list-automations.use-case'

// Automation infrastructure imports
import TYPES from '../../application/di/types'

export type AutomationHonoContextType = {
  listAutomationsUseCase: ListAutomationsUseCase
}

@injectable()
export class AutomationHonoContext {
  constructor(
    @inject(TYPES.UseCase.List)
    private readonly listAutomationsUseCase: ListAutomationsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listAutomationsUseCase', this.listAutomationsUseCase)
  }
}
