import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { Action } from '../../domain/entity'
import type { App } from '../../../app/domain/entity/app.entity'

@injectable()
export class SetupActionUseCase {
  constructor(
    @inject(TYPES.Action.Repository)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(app: App, action: Action) {
    this.actionRepository.debug(`setup "${action.schema.name}"`)
    const { schema } = action
    switch (schema.service) {
      case 'code': {
        const inputData = this.actionRepository.code(app, schema.inputData).fillInputData({})
        switch (schema.action) {
          case 'run-typescript': {
            const error = await this.actionRepository.code(app, inputData).lint(schema.code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Typescript code')
            }
            break
          }
          case 'run-javascript': {
            const error = await this.actionRepository.code(app, inputData).lint(schema.code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Javascript code')
            }
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
          case 'get':
            break
          case 'post':
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
          case 'only-continue-if':
            break
        }
        break
      }
      case 'paths': {
        switch (schema.action) {
          case 'split-into-paths':
            break
        }
        break
      }
      case 'calendly': {
        switch (schema.action) {
          case 'list-webhook-subscriptions':
            break
        }
        break
      }
      case 'google-sheets': {
        switch (schema.action) {
          case 'create-spreadsheet-row':
            break
        }
        break
      }
      default: {
        const _exhaustiveCheck: never = schema
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}
