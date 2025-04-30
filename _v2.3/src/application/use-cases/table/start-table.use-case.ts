import type { ITableRepository } from '/domain/repositories/table-repository.interface'
import { Table } from '/domain/entities/table.entity'

export class StartTableUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(table: Table): Promise<void> {
    await this.tableRepository.migrate()
    const tableItem = await this.tableRepository.findById(table.schema.id)
    if (!tableItem) {
      await this.tableRepository.insert(table.toItem())
    }
  }
}
