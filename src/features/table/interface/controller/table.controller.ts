import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class TableController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listTablesUseCase = c.get('listTablesUseCase')
    const listTablesDto = await listTablesUseCase.execute(app)
    return c.json(listTablesDto)
  }

  static async createRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const createRecordUseCase = c.get('createRecordUseCase')
    const createRecordDto = await createRecordUseCase.execute(app, tableId, c.req.raw)
    return c.json(createRecordDto, 201)
  }

  static async readRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const readRecordUseCase = c.get('readRecordUseCase')
    const readRecordDto = await readRecordUseCase.execute(app, tableId, recordId)
    return c.json(readRecordDto)
  }

  static async listRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const listRecordsUseCase = c.get('listRecordsUseCase')
    const listRecordsDto = await listRecordsUseCase.execute(app, tableId)
    return c.json(listRecordsDto)
  }

  static async updateRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const updateRecordUseCase = c.get('updateRecordUseCase')
    const updateRecordDto = await updateRecordUseCase.execute(app, tableId, recordId, c.req.raw)
    return c.json(updateRecordDto)
  }

  static async updateMultipleRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const updateMultipleRecordsUseCase = c.get('updateMultipleRecordsUseCase')
    const updateMultipleRecordsDto = await updateMultipleRecordsUseCase.execute(
      app,
      tableId,
      c.req.raw
    )
    return c.json(updateMultipleRecordsDto)
  }

  static async deleteRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const deleteRecordUseCase = c.get('deleteRecordUseCase')
    const deleteRecordDto = await deleteRecordUseCase.execute(app, tableId, recordId)
    return c.json(deleteRecordDto)
  }

  static async deleteMultipleRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const ids = c.req.queries('ids')
    const deleteMultipleRecordsUseCase = c.get('deleteMultipleRecordsUseCase')
    const deleteMultipleRecordsDto = await deleteMultipleRecordsUseCase.execute(app, tableId, ids)
    return c.json(deleteMultipleRecordsDto)
  }
}
