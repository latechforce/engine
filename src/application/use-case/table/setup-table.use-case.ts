import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/domain/entity/table.entity'
import type { ITableRepository } from '@/domain/repository-interface/table-repository.interface'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Repository.Table)
    private readonly tableRepository: ITableRepository
  ) {}

  async execute(table: Table) {
    this.tableRepository.debug(`setup "${table.schema.name}"`)
    await this.tableRepository.setup(table)
  }
}
