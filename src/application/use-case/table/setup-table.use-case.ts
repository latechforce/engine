import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/domain/entity/table.entity'
import type { ITableRepository } from '@/domain/repository-interface/table-repository.interface'
import type { SetupFieldUseCase } from '../field/setup-field.use-case'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Repository.Table)
    private readonly tableRepository: ITableRepository,
    @inject(TYPES.UseCase.SetupField)
    private readonly setupFieldUseCase: SetupFieldUseCase
  ) {}

  async execute(table: Table) {
    this.tableRepository.debug(`setup "${table.name}"`)
    for (const field of table.fields) {
      await this.setupFieldUseCase.execute(field)
    }
    await this.tableRepository.setup(table)
  }
}
