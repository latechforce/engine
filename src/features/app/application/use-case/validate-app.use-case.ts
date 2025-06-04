import TYPES from '../../../../shared/application/di/types'
import { injectable, inject } from 'inversify'
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'

@injectable()
export class ValidateAppUseCase {
  constructor(
    @inject(TYPES.App.Repository)
    private readonly appRepository: IAppRepository
  ) {}

  async execute(unknownSchema: unknown): Promise<ValidateResult> {
    return this.appRepository.validate(unknownSchema)
  }
}
