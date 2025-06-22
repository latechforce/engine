import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { Run } from '../../../run/domain/entity/run.entity'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { App } from '../../../app/domain/entity/app.entity'
import type { RunFilterUseCase } from './run-filter.use-case'
import type { ActionSchema } from '../../domain/schema/action.schema'
import type { IRunRepository } from '../../../run/domain/repository-interface/run-repository.interface'
import type { PathStep } from '../../../run/domain/value-object.ts/paths-step.value-object'

@injectable()
export class RunActionUseCase {
  constructor(
    @inject(TYPES.Action.Repository)
    private readonly actionRepository: IActionRepository,
    @inject(TYPES.Action.UseCase.RunFilter)
    private readonly runFilterUseCase: RunFilterUseCase,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(
    app: App,
    action: ActionSchema,
    run: Run,
    actionPath: string
  ): Promise<ActionResult> {
    this.actionRepository.log.debug(`running action "${action.name}"`)
    try {
      let data: Record<string, unknown> = {}
      const fillInputData = <T extends Record<string, unknown>>(params: T) =>
        this.fillInputData(params, actionPath, action, run)
      switch (action.service) {
        case 'code': {
          switch (action.action) {
            case 'run-typescript': {
              const { inputData, code } = await fillInputData(action.params)
              data = await this.actionRepository.code(app, inputData).runTypescript(code)
              break
            }
            case 'run-javascript': {
              const { inputData, code } = await fillInputData(action.params)
              data = await this.actionRepository.code(app, inputData).runJavascript(code)
              break
            }
            default: {
              const _exhaustiveCheck: never = action
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        case 'http': {
          switch (action.action) {
            case 'get': {
              const { url, headers } = await fillInputData(action.params)
              data = await this.actionRepository.http(url, { headers }).get()
              break
            }
            case 'post': {
              const { url, headers, body } = await fillInputData(action.params)
              data = await this.actionRepository.http(url, { headers }).post(body)
              break
            }
            case 'response': {
              data = await fillInputData(action.params ?? {})
              break
            }
            default: {
              const _exhaustiveCheck: never = action
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        case 'filter': {
          switch (action.action) {
            case 'only-continue-if': {
              const params = await fillInputData(action.params)
              data = await this.runFilterUseCase.execute(params, run)
              break
            }
            case 'split-into-paths': {
              const paths: { [key: string]: object } = {}
              const pathsSteps: PathStep[] = []
              for (const path of action.params) {
                const output = run.getStepsOutput()
                const filter = this.actionRepository.fillSchema(path.filter, output)
                const result = await this.runFilterUseCase.execute(filter, run)
                paths[path.name] = result
                pathsSteps.push({
                  schema: path,
                  input: filter,
                  output: result,
                  actions: [],
                })
              }
              run.startActionPathsStep(action, pathsSteps)
              await this.runRepository.update(run)
              data = paths
              break
            }
            default: {
              const _exhaustiveCheck: never = action
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        default: {
          const connection = app.findConnection(action.account)
          if (!connection) {
            throw new Error(`Connection not found for account ${action.account}`)
          }
          action.params = await fillInputData(action.params ?? {})
          return await this.actionRepository.runIntegration(action, connection)
        }
      }
      if (!data) data = {}
      return { data }
    } catch (error) {
      if (error instanceof Error) {
        this.actionRepository.log.error(error.message)
        return { error: { message: error.message } }
      } else {
        this.actionRepository.log.error(String(error))
        return { error: { message: 'Unknown error' } }
      }
    }
  }

  async fillInputData<T extends Record<string, unknown>>(
    inputData: T,
    actionPath: string,
    action: ActionSchema,
    run: Run
  ): Promise<T> {
    const output = run.getStepsOutput()
    const inputDataFilled = this.actionRepository.fillSchema(inputData, output)
    run.startActionStep(actionPath, action, inputDataFilled)
    await this.runRepository.update(run)
    return inputDataFilled
  }
}
