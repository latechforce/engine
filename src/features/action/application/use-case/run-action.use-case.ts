import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { Run } from '../../../run/domain/entity/run.entity'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { App } from '../../../app/domain/entity/app.entity'
import type { RunFilterUseCase } from './run-filter.use-case'
import type { ActionSchema } from '../../domain/schema/action.schema'
import type { ITokenRepository } from '../../../connection/domain/repository-interface/token-repository.interface'

@injectable()
export class RunActionUseCase {
  constructor(
    @inject(TYPES.Action.Repository)
    private readonly actionRepository: IActionRepository,
    @inject(TYPES.Action.UseCase.RunFilter)
    private readonly runFilterUseCase: RunFilterUseCase,
    @inject(TYPES.Connection.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {}

  async execute(app: App, action: ActionSchema, run: Run): Promise<ActionResult> {
    this.actionRepository.debug(`running action "${action.name}"`)
    try {
      let data: Record<string, unknown> = {}
      const actionFilled = this.actionRepository.fillSchema(action, run.data)
      switch (actionFilled.service) {
        case 'code': {
          switch (actionFilled.action) {
            case 'run-typescript': {
              const { inputData, code } = actionFilled.runTypescriptCode
              data = await this.actionRepository.code(app, inputData).runTypescript(code)
              break
            }
            case 'run-javascript': {
              const { inputData, code } = actionFilled.runJavascriptCode
              data = await this.actionRepository.code(app, inputData).runJavascript(code)
              break
            }
            default: {
              const _exhaustiveCheck: never = actionFilled
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        case 'http': {
          switch (actionFilled.action) {
            case 'get': {
              const { url, headers } = actionFilled.getHttp
              data = await this.actionRepository.http(url, { headers }).get()
              break
            }
            case 'post': {
              const { url, headers, body } = actionFilled.postHttp
              data = await this.actionRepository.http(url, { headers }).post(body)
              break
            }
            case 'response':
              break
            default: {
              const _exhaustiveCheck: never = actionFilled
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        case 'filter': {
          switch (actionFilled.action) {
            case 'only-continue-if': {
              const { onlyContinueIfFilter } = actionFilled
              data = await this.runFilterUseCase.execute(onlyContinueIfFilter, run)
              break
            }
            case 'split-into-paths': {
              const paths: { [key: string]: object } = {}
              for (const path of actionFilled.splitIntoPathsFilter) {
                const result = await this.runFilterUseCase.execute(path.onlyContinueIf, run)
                paths[path.name] = result
              }
              data = paths
              break
            }
            default: {
              const _exhaustiveCheck: never = actionFilled
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        default: {
          const connection = app.findConnection(actionFilled.account)
          if (!connection) {
            throw new Error(`Connection not found for account ${actionFilled.account}`)
          }
          const token = await this.tokenRepository.getAccessToken(connection)
          if (!token) throw new Error(`Token not found for connection ${connection.id}`)
          return await this.actionRepository.runIntegration(actionFilled, token)
        }
      }
      if (!data) data = {}
      return { data }
    } catch (error) {
      if (error instanceof Error) {
        this.actionRepository.error(error.message)
        return { error: { message: error.message } }
      } else {
        this.actionRepository.error(String(error))
        return { error: { message: 'Unknown error' } }
      }
    }
  }
}
