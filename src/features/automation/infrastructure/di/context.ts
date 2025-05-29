import type { ListAutomationsUseCase } from '@/automation/application/use-case/list-automations.use-case'
import { inject, injectable } from 'inversify'
import TYPES from './types'
import type { Context } from 'hono'

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
