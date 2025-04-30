import type { StartTableUseCase } from '/application/use-cases/table/start-table.use-case'
import type { Table } from '/domain/entities/table.entity'

export class TableController {
  constructor(private startTableUseCase: StartTableUseCase) {}

  async start(table: Table) {
    return this.startTableUseCase.execute(table)
  }
}
