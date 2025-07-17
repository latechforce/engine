import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ReplayedRunsDto } from '../dto/replay-runs-dto'
import type { RunAutomationUseCase } from '../../../automation/application/use-case/run-automation.use-case'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'

@injectable()
export class ReplayRunsUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Automation.UseCase.Run)
    private readonly runAutomationUseCase: RunAutomationUseCase
  ) {}

  async execute(app: App, runIds: string[]): Promise<ReplayedRunsDto> {
    const runs = await this.runRepository.listAllByIdsAndStatus(runIds, 'stopped')
    for (const run of runs) {
      this.runRepository.debug(`replaying run "${run.id}"`)
      const automation = app.findAutomation(run.automation_id)
      if (!automation) {
        throw new HttpError('Automation not found', 404)
      }
      await this.runAutomationUseCase.execute(app, run, automation)
    }
    return {
      replayed: runs.map((run) => run.id),
    }
  }
}
