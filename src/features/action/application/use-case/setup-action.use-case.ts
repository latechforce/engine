import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { App } from '../../../app/domain/entity/app.entity'
import type { ActionSchema } from '../../domain/schema/action.schema'

@injectable()
export class SetupActionUseCase {
  constructor(
    @inject(TYPES.Action.Repository)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(app: App, action: ActionSchema) {
    this.actionRepository.debug(`setup "${action.name}"`)
    this.actionRepository.fillSchema(action)
    switch (action.service) {
      case 'code': {
        switch (action.action) {
          case 'run-typescript': {
            const { code } = action.runTypescriptCode
            const error = await this.actionRepository.code(app, {}).lint(code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Typescript code')
            }
            break
          }
          case 'run-javascript': {
            const { code } = action.runJavascriptCode
            const error = await this.actionRepository.code(app, {}).lint(code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Javascript code')
            }
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
          case 'get':
            break
          case 'post':
            break
          case 'response':
            break
          default: {
            const _exhaustiveCheck: never = action
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        break
      }
      case 'filter': {
        switch (action.action) {
          case 'only-continue-if':
            break
          case 'split-into-paths':
            break
          default: {
            const _exhaustiveCheck: never = action
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        break
      }
      case 'calendly': {
        switch (action.action) {
          case 'list-webhook-subscriptions':
            break
          default: {
            const _exhaustiveCheck: never = action
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        break
      }
      case 'google-sheets': {
        switch (action.action) {
          case 'create-spreadsheet-row':
            break
          default: {
            const _exhaustiveCheck: never = action
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        break
      }
      case 'google-gmail': {
        switch (action.action) {
          case 'send-email':
            break
          default: {
            const _exhaustiveCheck: never = action
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
        break
      }
      default: {
        const _exhaustiveCheck: never = action
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}
