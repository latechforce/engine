import TYPES from '@/shared/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/table/domain/entity/table.entity'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Table.Repository)
    private readonly tableRepository: ITableRepository
  ) {}

  async execute(table: Table) {
    this.tableRepository.debug(`setup "${table.schema.name}"`)
    await this.tableRepository.setup(table)
  }
}
