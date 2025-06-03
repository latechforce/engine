// Third-party imports
import { injectable, inject } from 'inversify'

// Shared imports
import TYPES from '@/shared/application/di/types'

// Action application imports
import type { RunActionUseCase } from '@/action/application/use-case/run-action.use-case'

// Run domain imports
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import { type Run } from '@/run/domain/entity/run.entity'

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

  async execute(app: App, run: Run, automation: Automation, pathName?: string) {
    try {
      this.automationRepository.info(
        pathName ? `playing path "${pathName}"` : `playing automation "${automation.schema.name}"`
      )
      if (pathName) {
        const path = automation.findPath(pathName)
        if (path.actions.length > 0) {
          for (const action of path.actions) {
            const { data, error } = await this.runActionUseCase.execute(app, action, run)
            if (error) {
              run.stop(action.schema.name, error)
              await this.runRepository.update(run)
              this.automationRepository.info(
                `action "${action.schema.name}" stopped with error: ${error.message}`
              )
              return
            }
            if (action.schema.service === 'filter' && 'canContinue' in data && !data.canContinue) {
              run.filter(action.schema.name, data)
              await this.runRepository.update(run)
              this.automationRepository.info(`action "${action.schema.name}" filtered`)
              return
            }
            run.actionPathSuccess(pathName, data)
            await this.runRepository.update(run)
            if (action.schema.service === 'paths') {
              await Promise.all(
                action.schema.paths.map(async (path) => {
                  const nextPathName = pathName + '.' + action.schema.name + '.' + path.name
                  const result = data[path.name]
                  if (
                    Array.isArray(result) &&
                    result.length > 0 &&
                    result[0].canContinue === true
                  ) {
                    await this.execute(app, run, automation, nextPathName)
                  }
                })
              )
            }
            this.automationRepository.info(`action "${action.schema.name}" succeeded`)
          }
        }
      } else {
        if (automation.actions.length === 0) {
          run.success()
          await this.runRepository.update(run)
        } else {
          for (const action of automation.actions) {
            if (run.data[action.schema.name]) {
              continue
            }
            const { data, error } = await this.runActionUseCase.execute(app, action, run)
            if (error) {
              run.stop(action.schema.name, error)
              await this.runRepository.update(run)
              this.automationRepository.info(
                `action "${action.schema.name}" stopped with error: ${error.message}`
              )
              return
            }
            if (action.schema.service === 'filter' && 'canContinue' in data && !data.canContinue) {
              run.filter(action.schema.name, data)
              await this.runRepository.update(run)
              this.automationRepository.info(`action "${action.schema.name}" filtered`)
              return
            }
            run.actionSuccess(action.schema.name, data)
            await this.runRepository.update(run)
            if (action.schema.service === 'paths') {
              await Promise.all(
                action.schema.paths.map(async (path) => {
                  const pathName = action.schema.name + '.' + path.name
                  const result = data[path.name]
                  if (
                    result &&
                    typeof result === 'object' &&
                    'canContinue' in result &&
                    result.canContinue === true
                  ) {
                    await this.execute(app, run, automation, pathName)
                  }
                })
              )
            }
            this.automationRepository.info(`action "${action.schema.name}" succeeded`)
          }
          run.success()
          await this.runRepository.update(run)
        }
      }
      this.automationRepository.info(
        pathName ? `path "${pathName}" finished` : `automation "${automation.schema.name}" finished`
      )
    } catch (error) {
      if (error instanceof Error) {
        this.automationRepository.error(
          pathName
            ? `path "${pathName}" failed: ${error.message}`
            : `automation "${automation.schema.name}" failed: ${error.message}`
        )
        run.stop('execution', error)
        await this.runRepository.update(run)
      } else {
        throw error
      }
    }
  }
}
