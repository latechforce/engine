import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { IFieldRepository } from '@/domain/repository-interface/field-repository.interface'
import type { Field } from '@/domain/entity/field.entity'

@injectable()
export class SetupFieldUseCase {
  constructor(
    @inject(TYPES.Repository.Field)
    private readonly fieldRepository: IFieldRepository
  ) {}

  async execute(field: Field) {
    this.fieldRepository.debug(`setup "${field.name}"`)
  }
}
