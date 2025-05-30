import type { ListRunsUseCase } from '@/run/application/use-case/list-runs.use-case'
import { inject, injectable } from 'inversify'
import TYPES from '../../application/di/types'
import type { GetRunUseCase } from '@/run/application/use-case/get-run.use-case'
import type { Context } from 'hono'

export type RunHonoContextType = {
  listRunsUseCase: ListRunsUseCase
  getRunUseCase: GetRunUseCase
}

@injectable()
export class RunHonoContext {
  constructor(
    @inject(TYPES.UseCase.ListRuns)
    private readonly listRunsUseCase: ListRunsUseCase,
    @inject(TYPES.UseCase.GetRun)
    private readonly getRunUseCase: GetRunUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listRunsUseCase', this.listRunsUseCase)
    c.set('getRunUseCase', this.getRunUseCase)
  }
}
