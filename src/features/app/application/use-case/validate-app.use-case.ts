import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'

export class ValidateAppUseCase {
  constructor(private readonly appRepository: IAppRepository) {}

  async execute(unknownSchema: unknown): Promise<ValidateResult> {
    return this.appRepository.validate(unknownSchema)
  }
}
