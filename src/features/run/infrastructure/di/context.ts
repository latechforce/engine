import type { ListRunsUseCase } from '../../application/use-case/list-runs.use-case'
import type { GetRunUseCase } from '../../application/use-case/get-run.use-case'
import type { ReplayRunsUseCase } from '../../application/use-case/replay-runs.use-case'
import type { Context } from 'hono'

export type RunHonoContextType = {
  listRunsUseCase: ListRunsUseCase
  getRunUseCase: GetRunUseCase
  replayRunsUseCase: ReplayRunsUseCase
}

export class RunHonoContext {
  constructor(
    private readonly listRunsUseCase: ListRunsUseCase,
    private readonly getRunUseCase: GetRunUseCase,
    private readonly replayRunsUseCase: ReplayRunsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listRunsUseCase', this.listRunsUseCase)
    c.set('getRunUseCase', this.getRunUseCase)
    c.set('replayRunsUseCase', this.replayRunsUseCase)
  }
}
