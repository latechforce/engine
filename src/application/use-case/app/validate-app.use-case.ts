import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { IAppRepository } from '@/domain/repository-interface/app-repository.interface'
import type { ValidateResult } from '@/domain/value-object/validate-result.value-object'

@injectable()
export class ValidateAppUseCase {
  constructor(
    @inject(TYPES.Repository.App)
    private readonly appRepository: IAppRepository
  ) {}

  async execute(unknownSchema: unknown): Promise<ValidateResult> {
    return this.appRepository.validate(unknownSchema)
  }
}
