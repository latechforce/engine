import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Table } from '@/domain/entity/table.entity'
import type { ITableRepository } from '@/domain/repository-interface/table-repository.interface'
import type { SetupColumnUseCase } from '../column/setup-column.use-case'

@injectable()
export class SetupTableUseCase {
  constructor(
    @inject(TYPES.Repository.Table)
    private readonly tableRepository: ITableRepository,
    @inject(TYPES.UseCase.SetupColumn)
    private readonly setupColumnUseCase: SetupColumnUseCase
  ) {}

  async execute(table: Table) {
    this.tableRepository.debug(`setup "${table.schema.name}"`)
    for (const field of table.fields) {
      await this.setupColumnUseCase.execute(field)
    }
    await this.tableRepository.setup(table)
  }
}
