import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { IActionRepository } from '@/domain/repository-interface/action-repository.interface'
import type { Action } from '@/domain/entity/action.entity'
import type { RunPlaying } from '@/domain/entity/run'

@injectable()
export class RunActionUseCase {
  constructor(
    @inject(TYPES.Repository.Action)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(action: Action, run: RunPlaying): Promise<object> {
    const { schema } = action
    switch (schema.service) {
      case 'code': {
        const inputData = this.actionRepository.code(schema.inputData).fillInputData(run.data)
        switch (schema.action) {
          case 'run-typescript':
            return this.actionRepository.code(inputData).runTypescript(schema.code)
          case 'run-javascript':
            return this.actionRepository.code(inputData).runJavascript(schema.code)
        }
        break
      }
      case 'http':
        switch (schema.action) {
          case 'response':
            return {}
          case 'get':
            return this.actionRepository.http(schema.url, { headers: schema.headers }).get()
          case 'post':
            return this.actionRepository
              .http(schema.url, { headers: schema.headers })
              .post(schema.body)
        }
        break
    }
  }
}
