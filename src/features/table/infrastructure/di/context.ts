import { inject, injectable } from 'inversify'
import type { Context } from 'hono'
import type { CreateRecordUseCase } from '../../application/use-case/create-record.use-case'
import TYPES from '../../application/di/types'
import type { ReadRecordUseCase } from '../../application/use-case/read-record.use-case'
import type { ListRecordsUseCase } from '../../application/use-case/list-records.use-case'
import type { UpdateRecordUseCase } from '../../application/use-case/update-record.use-case'
import type { UpdateMultipleRecordsUseCase } from '../../application/use-case/update-multiple-records.use-case'
import type { DeleteRecordUseCase } from '../../application/use-case/delete-record.use-case'
import type { DeleteMultipleRecordsUseCase } from '../../application/use-case/delete-multiple-record.use-case'
import type { ListTablesUseCase } from '../../application/use-case/list-tables.use-case'

export type TableHonoContextType = {
  createRecordUseCase: CreateRecordUseCase
  readRecordUseCase: ReadRecordUseCase
  listRecordsUseCase: ListRecordsUseCase
  updateRecordUseCase: UpdateRecordUseCase
  updateMultipleRecordsUseCase: UpdateMultipleRecordsUseCase
  deleteRecordUseCase: DeleteRecordUseCase
  deleteMultipleRecordsUseCase: DeleteMultipleRecordsUseCase
  listTablesUseCase: ListTablesUseCase
}

@injectable()
export class TableHonoContext {
  constructor(
    @inject(TYPES.UseCase.CreateRecord)
    private readonly createRecordUseCase: CreateRecordUseCase,
    @inject(TYPES.UseCase.ReadRecord)
    private readonly readRecordUseCase: ReadRecordUseCase,
    @inject(TYPES.UseCase.ListRecords)
    private readonly listRecordsUseCase: ListRecordsUseCase,
    @inject(TYPES.UseCase.UpdateRecord)
    private readonly updateRecordUseCase: UpdateRecordUseCase,
    @inject(TYPES.UseCase.UpdateMultipleRecords)
    private readonly updateMultipleRecordsUseCase: UpdateMultipleRecordsUseCase,
    @inject(TYPES.UseCase.DeleteRecord)
    private readonly deleteRecordUseCase: DeleteRecordUseCase,
    @inject(TYPES.UseCase.DeleteMultipleRecords)
    private readonly deleteMultipleRecordsUseCase: DeleteMultipleRecordsUseCase,
    @inject(TYPES.UseCase.List)
    private readonly listTablesUseCase: ListTablesUseCase
  ) {}

  setVariables(c: Context) {
    c.set('createRecordUseCase', this.createRecordUseCase)
    c.set('readRecordUseCase', this.readRecordUseCase)
    c.set('listRecordsUseCase', this.listRecordsUseCase)
    c.set('updateRecordUseCase', this.updateRecordUseCase)
    c.set('updateMultipleRecordsUseCase', this.updateMultipleRecordsUseCase)
    c.set('deleteRecordUseCase', this.deleteRecordUseCase)
    c.set('deleteMultipleRecordsUseCase', this.deleteMultipleRecordsUseCase)
    c.set('listTablesUseCase', this.listTablesUseCase)
  }
}
