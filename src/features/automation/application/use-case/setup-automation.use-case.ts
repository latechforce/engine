// Third-party imports
import { injectable, inject } from 'inversify'

// Shared imports
import TYPES from '@/shared/application/di/types'

// Action application imports
import type { SetupActionUseCase } from '@/action/application/use-case/setup-action.use-case'

// Run domain imports
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import { PlayingRun } from '@/run/domain/entity/playing-run.entity'

// Trigger application imports
import type { SetupTriggerUseCase } from '@/trigger/application/use-case/setup-trigger.use-case'

// Automation domain imports
import type { Automation } from '@/automation/domain/entity/automation.entity'
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'

// Automation application imports
import type { RunAutomationUseCase } from './run-automation.use-case'

@injectable()
export class SetupAutomationUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Trigger.UseCase.Setup)
    private readonly setupTriggerUseCase: SetupTriggerUseCase,
    @inject(TYPES.Action.UseCase.Setup)
    private readonly setupActionUseCase: SetupActionUseCase,
    @inject(TYPES.Automation.UseCase.Run)
    private readonly runAutomationUseCase: RunAutomationUseCase,
    @inject(TYPES.Automation.Repository)
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
