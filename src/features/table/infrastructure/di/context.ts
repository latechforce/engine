import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import type { CreateTableRecordUseCase } from '@/table/application/use-case/create-table-record.use-case'
import TYPES from '@/table/application/di/types'
import type { ReadTableRecordUseCase } from '@/table/application/use-case/read-table-record.use-case'
import type { ListTableRecordsUseCase } from '@/table/application/use-case/list-table-records.use-case'
import type { UpdateTableRecordUseCase } from '@/table/application/use-case/update-table-record.use-case'
import type { UpdateMultipleTableRecordsUseCase } from '@/table/application/use-case/update-multiple-table-records.use-case'
import type { DeleteTableRecordUseCase } from '@/table/application/use-case/delete-table-record.use-case'
import type { DeleteMultipleTableRecordsUseCase } from '@/table/application/use-case/delete-multiple-table-record.use-case'

export type TableHonoContextType = {
  createTableRecordUseCase: CreateTableRecordUseCase
  readTableRecordUseCase: ReadTableRecordUseCase
  listTableRecordsUseCase: ListTableRecordsUseCase
  updateTableRecordUseCase: UpdateTableRecordUseCase
  updateMultipleTableRecordsUseCase: UpdateMultipleTableRecordsUseCase
  deleteTableRecordUseCase: DeleteTableRecordUseCase
  deleteMultipleTableRecordsUseCase: DeleteMultipleTableRecordsUseCase
}

@injectable()
export class TableHonoContext {
  constructor(
    @inject(TYPES.UseCase.CreateRecord)
    private readonly createTableRecordUseCase: CreateTableRecordUseCase,
    @inject(TYPES.UseCase.ReadRecord)
    private readonly readTableRecordUseCase: ReadTableRecordUseCase,
    @inject(TYPES.UseCase.ListRecords)
    private readonly listTableRecordsUseCase: ListTableRecordsUseCase,
    @inject(TYPES.UseCase.UpdateRecord)
    private readonly updateTableRecordUseCase: UpdateTableRecordUseCase,
    @inject(TYPES.UseCase.UpdateMultipleRecords)
    private readonly updateMultipleTableRecordsUseCase: UpdateMultipleTableRecordsUseCase,
    @inject(TYPES.UseCase.DeleteRecord)
    private readonly deleteTableRecordUseCase: DeleteTableRecordUseCase,
    @inject(TYPES.UseCase.DeleteMultipleRecords)
    private readonly deleteMultipleTableRecordsUseCase: DeleteMultipleTableRecordsUseCase
  ) {}

  setVariables(c: Context) {
    c.set('createTableRecordUseCase', this.createTableRecordUseCase)
    c.set('readTableRecordUseCase', this.readTableRecordUseCase)
    c.set('listTableRecordsUseCase', this.listTableRecordsUseCase)
    c.set('updateTableRecordUseCase', this.updateTableRecordUseCase)
    c.set('updateMultipleTableRecordsUseCase', this.updateMultipleTableRecordsUseCase)
    c.set('deleteTableRecordUseCase', this.deleteTableRecordUseCase)
    c.set('deleteMultipleTableRecordsUseCase', this.deleteMultipleTableRecordsUseCase)
  }
}
