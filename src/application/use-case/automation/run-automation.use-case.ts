import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { RunActionUseCase } from '../action/run-action.use-case'
import { type RunPlaying } from '../../../domain/entity/run/run-playing.entity'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import type { IAutomationRepository } from '@/domain/repository-interface/automation-repository.interface'

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

  async execute(run: RunPlaying) {
    this.automationRepository.info(`playing automation "${run.automation.name}"`)
    if (run.automation.actions.length === 0) {
      const runSuccess = run.success()
      await this.runRepository.update(runSuccess)
    } else {
      for (const action of run.automation.actions) {
        if (run.data[action.name]) {
          continue
        }
        try {
          const result = await this.runActionUseCase.execute(action, run)
          run.actionSuccess(action.name, result)
          await this.runRepository.update(run)
          this.automationRepository.info(`action "${action.name}" succeeded`)
        } catch (error) {
          const runStopped = run.stop(
            action.name,
            error instanceof Error ? error : new Error(String(error))
          )
          await this.runRepository.update(runStopped)
          this.automationRepository.info(`action "${action.name}" stopped with error: ${error}`)
          break
        }
      }
      const runSuccess = run.success()
      await this.runRepository.update(runSuccess)
    }
    this.automationRepository.info(`automation "${run.automation.name}" finished`)
  }
}
