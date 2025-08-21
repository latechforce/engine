// Third-party imports
import type { Context } from 'hono'
import type { ListAutomationsUseCase } from '../../application/use-case/list-automations.use-case'
import type { SetStatusUseCase } from '../../application/use-case/set-status.use-case'
import type { GetAutomationUseCase } from '../../application/use-case/get-automation.use-case'

export type AutomationHonoContextType = {
  listAutomationsUseCase: ListAutomationsUseCase
  setStatusUseCase: SetStatusUseCase
  getAutomationUseCase: GetAutomationUseCase
}

export class AutomationHonoContext {
  constructor(
    private readonly listAutomationsUseCase: ListAutomationsUseCase,

    private readonly setStatusUseCase: SetStatusUseCase,

    private readonly getAutomationUseCase: GetAutomationUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listAutomationsUseCase', this.listAutomationsUseCase)
    c.set('setStatusUseCase', this.setStatusUseCase)
    c.set('getAutomationUseCase', this.getAutomationUseCase)
  }
}
