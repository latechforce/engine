// Third-party imports
import { injectable, inject } from 'inversify'

// Shared imports
import TYPES from '@/shared/application/di/types'

// Action application imports
import type { RunActionUseCase } from '@/action/application/use-case/run-action.use-case'

// Run domain imports
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import { type PlayingRun } from '@/run/domain/entity/playing-run.entity'

// Automation domain imports
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'
import type { Automation } from '@/automation/domain/entity/automation.entity'
import type { App } from '@/app/domain/entity/app.entity'

@injectable()
export class RunAutomationUseCase {
  constructor(
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Action.UseCase.Run)
    private readonly runActionUseCase: RunActionUseCase
  ) {}

  async execute(app: App, run: PlayingRun, automation: Automation) {
    this.automationRepository.info(`playing automation "${automation.schema.name}"`)
    if (automation.actions.length === 0) {
      const SuccessRun = run.success()
      await this.runRepository.update(SuccessRun)
    } else {
      for (const action of automation.actions) {
        if (run.data[action.schema.name]) {
          continue
        }
        const { data, error } = await this.runActionUseCase.execute(app, action, run)
        if (error) {
          const stoppedRun = run.stop(action.schema.name, error)
          await this.runRepository.update(stoppedRun)
          this.automationRepository.info(
            `action "${action.schema.name}" stopped with error: ${error.message}`
          )
          return
        }
        if (action.schema.service === 'filter' && 'canContinue' in data && !data.canContinue) {
          const filteredRun = run.filter(action.schema.name, data)
          await this.runRepository.update(filteredRun)
          this.automationRepository.info(`action "${action.schema.name}" filtered`)
          return
        }
        run.actionSuccess(action.schema.name, data)
        await this.runRepository.update(run)
        this.automationRepository.info(`action "${action.schema.name}" succeeded`)
      }
      const successRun = run.success()
      await this.runRepository.update(successRun)
    }
    this.automationRepository.info(`automation "${run.automation_schema.name}" finished`)
  }
}
