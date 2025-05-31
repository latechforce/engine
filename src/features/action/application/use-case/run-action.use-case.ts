import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '@/action/domain/repository-interface/action-repository.interface'
import type { Action } from '@/action/domain/entity'
import type { PlayingRun } from '@/run/domain/entity/playing-run.entity'
import { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import type { ActionResult } from '@/action/domain/value-object/action-result.value-object'
import type { App } from '@/app/domain/entity/app.entity'

@injectable()
export class RunActionUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(app: App, action: Action, run: PlayingRun): Promise<ActionResult> {
    if (action instanceof IntegrationAction) {
      return this.actionRepository.runIntegration(action)
    } else {
      try {
        let data: object = {}
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
            }
            break
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
