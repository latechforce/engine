import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { IAutomationRepository } from '../../../automation/domain/repository-interface/automation-repository.interface'
import type { ReplayedRunsDto } from '../dto/replay-runs-dto'

@injectable()
export class ReplayRunsUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App, ids: string[]): Promise<ReplayedRunsDto> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      replayed: ids,
    }
  }
}
