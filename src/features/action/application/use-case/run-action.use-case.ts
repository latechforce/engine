import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '@/action/domain/repository-interface/action-repository.interface'
import type { Action } from '@/action/domain/entity'
import type { Run } from '@/run/domain/entity/run.entity'
import { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import type { ActionResult } from '@/action/domain/value-object/action-result.value-object'
import type { App } from '@/app/domain/entity/app.entity'
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
      return this.actionRepository.runIntegration(action)
    } else {
      try {
        let data: Record<string, unknown> = {}
        const { schema } = action
        switch (schema.service) {
          case 'code': {
            const inputData = this.actionRepository
              .code(app, schema.inputData)
              .fillInputData(run.data)
            switch (schema.action) {
              case 'run-typescript':
                data = await this.actionRepository.code(app, inputData).runTypescript(schema.code)
                break
              case 'run-javascript':
                data = await this.actionRepository.code(app, inputData).runJavascript(schema.code)
                break
              default: {
                const _exhaustiveCheck: never = schema
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          case 'http': {
            switch (schema.action) {
              case 'get':
                data = await this.actionRepository
                  .http(schema.url, { headers: schema.headers })
                  .get()
                break
              case 'post':
                data = await this.actionRepository
                  .http(schema.url, { headers: schema.headers })
                  .post(schema.body)
                break
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
                data = await this.runFilterUseCase.execute(schema.conditions, run)
                break
              }
              default: {
                const _exhaustiveCheck: never = schema
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          case 'paths': {
            switch (schema.action) {
              case 'split-into-paths': {
                const paths: { [key: string]: object } = {}
                for (const path of schema.paths) {
                  const result = await this.runFilterUseCase.execute(path.conditions, run)
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
