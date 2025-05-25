import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '@/domain/repository-interface/action-repository.interface'
import type { Action } from '@/domain/entity/action'

@injectable()
export class SetupActionUseCase {
  constructor(
    @inject(TYPES.Repository.Action)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(action: Action) {
    this.actionRepository.debug(`setup "${action.schema.name}"`)
    const { schema } = action
    switch (schema.service) {
      case 'code': {
        const inputData = this.actionRepository.code(schema.inputData).fillInputData({})
        switch (schema.action) {
          case 'run-typescript': {
            const error = await this.actionRepository.code(inputData).lint(schema.code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Typescript code')
            }
            break
          }
          case 'run-javascript': {
            const error = await this.actionRepository.code(inputData).lint(schema.code)
            if (error) {
              this.actionRepository.error(error)
              throw new Error('Invalid Javascript code')
            }
            break
          }
        }
      }
    }
  }
}
