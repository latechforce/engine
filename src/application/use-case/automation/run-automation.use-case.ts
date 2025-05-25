import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { RunActionUseCase } from '../action/run-action.use-case'
import { type PlayingRun } from '../../../domain/entity/run/playing-run.entity'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import type { IAutomationRepository } from '@/domain/repository-interface/automation-repository.interface'
import type { Automation } from '@/domain/entity/automation.entity'

@injectable()
export class RunAutomationUseCase {
  constructor(
    @inject(TYPES.Repository.Automation)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Repository.Run)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.UseCase.RunAction)
    private readonly runActionUseCase: RunActionUseCase
  ) {}

  async execute(run: PlayingRun, automation: Automation) {
    this.automationRepository.info(`playing automation "${automation.schema.name}"`)
    if (automation.actions.length === 0) {
      const SuccessRun = run.success()
      await this.runRepository.update(SuccessRun)
    } else {
      for (const action of automation.actions) {
        if (run.data[action.schema.name]) {
          continue
        }
        try {
          const result = await this.runActionUseCase.execute(action, run)
          run.actionSuccess(action.schema.name, result)
          await this.runRepository.update(run)
          this.automationRepository.info(`action "${action.schema.name}" succeeded`)
        } catch (error) {
          const StoppedRun = run.stop(
            action.schema.name,
            error instanceof Error ? error : new Error(String(error))
          )
          await this.runRepository.update(StoppedRun)
          this.automationRepository.info(
            `action "${action.schema.name}" stopped with error: ${error}`
          )
          break
        }
      }
      const SuccessRun = run.success()
      await this.runRepository.update(SuccessRun)
    }
    this.automationRepository.info(`automation "${run.automation_schema.name}" finished`)
  }
}
