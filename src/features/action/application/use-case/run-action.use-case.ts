import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { Action } from '../../domain/entity'
import type { Run } from '../../../run/domain/entity/run.entity'
import { IntegrationAction } from '../../domain/entity/integration-action.entity'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { App } from '../../../app/domain/entity/app.entity'
import type { RunFilterUseCase } from './run-filter.use-case'

@injectable()
export class RunActionUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly actionRepository: IActionRepository,
    @inject(TYPES.UseCase.RunFilter)
    private readonly runFilterUseCase: RunFilterUseCase
  ) {}

  async execute(app: App, action: Action, run: Run): Promise<ActionResult> {
    if (action instanceof IntegrationAction) {
      this.actionRepository.debug(`running integration action "${action.schema.name}"`)
      const schema = this.actionRepository.fillSchema(action.schema, run.data)
      return this.actionRepository.runIntegration(schema, action.connection)
    } else {
      this.actionRepository.debug(`running service action "${action.schema.name}"`)
      try {
        let data: Record<string, unknown> = {}
        const schema = this.actionRepository.fillSchema(action.schema, run.data)
        switch (schema.service) {
          case 'code': {
            switch (schema.action) {
              case 'run-typescript': {
                const { inputData, code } = schema.runTypescriptCode
                data = await this.actionRepository.code(app, inputData).runTypescript(code)
                break
              }
              case 'run-javascript': {
                const { inputData, code } = schema.runJavascriptCode
                data = await this.actionRepository.code(app, inputData).runJavascript(code)
                break
              }
              default: {
                const _exhaustiveCheck: never = schema
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          case 'http': {
            switch (schema.action) {
              case 'get': {
                const { url, headers } = schema.getHttp
                data = await this.actionRepository.http(url, { headers }).get()
                break
              }
              case 'post': {
                const { url, headers, body } = schema.postHttp
                data = await this.actionRepository.http(url, { headers }).post(body)
                break
              }
              case 'response':
                break
              default: {
                const _exhaustiveCheck: never = schema
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          case 'filter': {
            switch (schema.action) {
              case 'only-continue-if': {
                const { onlyContinueIfFilter } = schema
                data = await this.runFilterUseCase.execute(onlyContinueIfFilter, run)
                break
              }
              case 'split-into-paths': {
                const paths: { [key: string]: object } = {}
                for (const path of schema.splitIntoPathsFilter) {
                  const result = await this.runFilterUseCase.execute(path.onlyContinueIf, run)
                  paths[path.name] = result
                }
                data = paths
                break
              }
              default: {
                const _exhaustiveCheck: never = schema
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          default: {
            const _exhaustiveCheck: never = schema
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
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
}
