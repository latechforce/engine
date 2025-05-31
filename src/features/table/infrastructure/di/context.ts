import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import type { CreateTableRecordUseCase } from '@/table/application/use-case/create-table-record.use-case'
import TYPES from '@/table/application/di/types'
import type { ReadTableRecordUseCase } from '@/table/application/use-case/read-table-record.use-case'
import type { ListTableRecordsUseCase } from '@/table/application/use-case/list-table-records.use-case'

export type TableHonoContextType = {
  createTableRecordUseCase: CreateTableRecordUseCase
  readTableRecordUseCase: ReadTableRecordUseCase
  listTableRecordsUseCase: ListTableRecordsUseCase
}

@injectable()
export class TableHonoContext {
  constructor(
    @inject(TYPES.UseCase.CreateRecord)
    private readonly createTableRecordUseCase: CreateTableRecordUseCase,
    @inject(TYPES.UseCase.ReadRecord)
    private readonly readTableRecordUseCase: ReadTableRecordUseCase,
    @inject(TYPES.UseCase.ListRecords)
    private readonly listTableRecordsUseCase: ListTableRecordsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('createTableRecordUseCase', this.createTableRecordUseCase)
    c.set('readTableRecordUseCase', this.readTableRecordUseCase)
    c.set('listTableRecordsUseCase', this.listTableRecordsUseCase)
  }
}
