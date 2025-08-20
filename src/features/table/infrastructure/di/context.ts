import type { Context } from 'hono'
import type { CreateRecordUseCase } from '../../application/use-case/create-record.use-case'
import type { ReadRecordUseCase } from '../../application/use-case/read-record.use-case'
import type { ListRecordsUseCase } from '../../application/use-case/list-records.use-case'
import type { UpdateRecordUseCase } from '../../application/use-case/update-record.use-case'
import type { UpdateMultipleRecordsUseCase } from '../../application/use-case/update-multiple-records.use-case'
import type { DeleteRecordUseCase } from '../../application/use-case/delete-record.use-case'
import type { DeleteMultipleRecordsUseCase } from '../../application/use-case/delete-multiple-record.use-case'
import type { ListTablesUseCase } from '../../application/use-case/list-tables.use-case'
import type { SetupTableUseCase } from '../../application/use-case/setup-table.use-case'

export type TableHonoContextType = {
  setupTableUseCase: SetupTableUseCase
  createRecordUseCase: CreateRecordUseCase
  readRecordUseCase: ReadRecordUseCase
  listRecordsUseCase: ListRecordsUseCase
  updateRecordUseCase: UpdateRecordUseCase
  updateMultipleRecordsUseCase: UpdateMultipleRecordsUseCase
  deleteRecordUseCase: DeleteRecordUseCase
  deleteMultipleRecordsUseCase: DeleteMultipleRecordsUseCase
  listTablesUseCase: ListTablesUseCase
}

export class TableHonoContext {
  constructor(
    private readonly setupTableUseCase: SetupTableUseCase,
    private readonly createRecordUseCase: CreateRecordUseCase,
    private readonly readRecordUseCase: ReadRecordUseCase,
    private readonly listRecordsUseCase: ListRecordsUseCase,
    private readonly updateRecordUseCase: UpdateRecordUseCase,
    private readonly updateMultipleRecordsUseCase: UpdateMultipleRecordsUseCase,
    private readonly deleteRecordUseCase: DeleteRecordUseCase,
    private readonly deleteMultipleRecordsUseCase: DeleteMultipleRecordsUseCase,
    private readonly listTablesUseCase: ListTablesUseCase
  ) {}

  setVariables(c: Context) {
    c.set('setupTableUseCase', this.setupTableUseCase)
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
