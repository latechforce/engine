import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { App } from '../../../app/domain/entity/app.entity'
import type { ActionSchema } from '../../domain/schema/action.schema'

export class SetupActionUseCase {
  constructor(private readonly actionRepository: IActionRepository) {}

  async execute(app: App, action: ActionSchema) {
    this.actionRepository.log.debug(`setup "${action.name}"`)
    this.actionRepository.validateSchemaTemplate(action)
    switch (action.service) {
      case 'code': {
        switch (action.action) {
          case 'run-typescript': {
            const { code } = action.params
            const error = await this.actionRepository.code(app, {}).lint(code)
            if (error) {
              this.actionRepository.log.error(error)
              throw new Error('Invalid Typescript code')
            }
            break
          }
          case 'run-javascript': {
            const { code } = action.params
            const error = await this.actionRepository.code(app, {}).lint(code)
            if (error) {
              this.actionRepository.log.error(error)
              throw new Error('Invalid Javascript code')
            }
            break
          }
        }
        break
      }
    }
  }
}
