import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ReplayedRunsDto } from '../dto/replay-runs-dto'

@injectable()
export class ReplayRunsUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(app: App, runIds: string[]): Promise<ReplayedRunsDto> {
    const runs = await this.runRepository.listAllByIdsAndStatus(runIds, 'stopped')
    for (const run of runs) {
      this.runRepository.debug(`replaying run "${run.id}"`)
      run.replay()
      await this.runRepository.update(run)
    }
    return {
      replayed: runs.map((run) => run.id),
    }
  }
}
