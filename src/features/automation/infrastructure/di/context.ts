// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import TYPES from '../../application/di/types'
import type { ListAutomationsUseCase } from '../../application/use-case/list-automations.use-case'
import type { SetStatusUseCase } from '../../application/use-case/set-status.use-case'
import type { GetAutomationUseCase } from '../../application/use-case/get-automation.use-case'

export type AutomationHonoContextType = {
  listAutomationsUseCase: ListAutomationsUseCase
  setStatusUseCase: SetStatusUseCase
  getAutomationUseCase: GetAutomationUseCase
}

@injectable()
export class AutomationHonoContext {
  constructor(
    @inject(TYPES.UseCase.List)
    private readonly listAutomationsUseCase: ListAutomationsUseCase,
    @inject(TYPES.UseCase.SetStatus)
    private readonly setStatusUseCase: SetStatusUseCase,
    @inject(TYPES.UseCase.GetAutomation)
    private readonly getAutomationUseCase: GetAutomationUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listAutomationsUseCase', this.listAutomationsUseCase)
    c.set('setStatusUseCase', this.setStatusUseCase)
    c.set('getAutomationUseCase', this.getAutomationUseCase)
  }
}
