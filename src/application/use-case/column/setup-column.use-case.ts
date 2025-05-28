import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { IColumnRepository } from '@/domain/repository-interface/column-repository.interface'
import type { Column } from '@/domain/entity/column.entity'

@injectable()
export class SetupColumnUseCase {
  constructor(
    @inject(TYPES.Repository.Column)
    private readonly fieldRepository: IColumnRepository
  ) {}

  async execute(field: Column) {
    this.fieldRepository.debug(`setup "${field.schema.name}"`)
  }
}
