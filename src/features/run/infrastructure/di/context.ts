import type { ListRunsUseCase } from '../../application/use-case/list-runs.use-case'
import { inject, injectable } from 'inversify'
import TYPES from '../../application/di/types'
import type { GetRunUseCase } from '../../application/use-case/get-run.use-case'
import type { ReplayRunsUseCase } from '../../application/use-case/replay-runs.use-case'
import type { Context } from 'hono'

export type RunHonoContextType = {
  listRunsUseCase: ListRunsUseCase
  getRunUseCase: GetRunUseCase
  replayRunsUseCase: ReplayRunsUseCase
}

@injectable()
export class RunHonoContext {
  constructor(
    @inject(TYPES.UseCase.ListRuns)
    private readonly listRunsUseCase: ListRunsUseCase,
    @inject(TYPES.UseCase.GetRun)
    private readonly getRunUseCase: GetRunUseCase,
    @inject(TYPES.UseCase.ReplayRuns)
    private readonly replayRunsUseCase: ReplayRunsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listRunsUseCase', this.listRunsUseCase)
    c.set('getRunUseCase', this.getRunUseCase)
    c.set('replayRunsUseCase', this.replayRunsUseCase)
  }
}
