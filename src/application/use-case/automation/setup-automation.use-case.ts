import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Automation } from '@/domain/entity/automation.entity'
import type { SetupTriggerUseCase } from '../trigger/setup-trigger.use-case'
import type { SetupActionUseCase } from '../action/setup-action.use-case'
import type { RunAutomationUseCase } from './run-automation.use-case'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import type { IAutomationRepository } from '@/domain/repository-interface/automation-repository.interface'
import { PlayingRun } from '@/domain/entity/run/playing-run.entity'

@injectable()
export class SetupAutomationUseCase {
  constructor(
    @inject(TYPES.Repository.Run)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.UseCase.SetupTrigger)
    private readonly setupTriggerUseCase: SetupTriggerUseCase,
    @inject(TYPES.UseCase.SetupAction)
    private readonly setupActionUseCase: SetupActionUseCase,
    @inject(TYPES.UseCase.RunAutomation)
    private readonly runAutomationUseCase: RunAutomationUseCase,
    @inject(TYPES.Repository.Automation)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(automation: Automation) {
    this.automationRepository.debug(`setup "${automation.schema.name}"`)
    for (const action of automation.actions) {
      await this.setupActionUseCase.execute(action)
    }
    await this.setupTriggerUseCase.execute(automation)
    this.runRepository.onCreate((run: PlayingRun) =>
      this.runAutomationUseCase.execute(run, automation)
    )
    const runs = await this.runRepository.listPlaying()
    for (const run of runs) {
      await this.runAutomationUseCase.execute(run, automation)
    }
  }
}
