import type { Context } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'

export class TableController {
  static async createRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const createTableRecordUseCase = c.get('createTableRecordUseCase')
    const createTableRecordDto = await createTableRecordUseCase.execute(app, tableId, c.req.raw)
    return c.json(createTableRecordDto, 201)
  }

  static async readRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const readTableRecordUseCase = c.get('readTableRecordUseCase')
    const readTableRecordDto = await readTableRecordUseCase.execute(app, tableId, recordId)
    return c.json(readTableRecordDto)
  }

  static async listRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const listTableRecordsUseCase = c.get('listTableRecordsUseCase')
    const listTableRecordsDto = await listTableRecordsUseCase.execute(app, tableId)
    return c.json(listTableRecordsDto)
  }

  static async updateRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const updateTableRecordUseCase = c.get('updateTableRecordUseCase')
    const updateTableRecordDto = await updateTableRecordUseCase.execute(
      app,
      tableId,
      recordId,
      c.req.raw
    )
    return c.json(updateTableRecordDto)
  }

  static async updateMultipleRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const updateMultipleTableRecordsUseCase = c.get('updateMultipleTableRecordsUseCase')
    const updateMultipleTableRecordsDto = await updateMultipleTableRecordsUseCase.execute(
      app,
      tableId,
      c.req.raw
    )
    return c.json(updateMultipleTableRecordsDto)
  }

  static async deleteRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const recordId = c.req.param('recordId')
    const deleteTableRecordUseCase = c.get('deleteTableRecordUseCase')
    const deleteTableRecordDto = await deleteTableRecordUseCase.execute(app, tableId, recordId)
    return c.json(deleteTableRecordDto)
  }

  static async deleteMultipleRecords(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const ids = c.req.queries('ids')
    const deleteMultipleTableRecordsUseCase = c.get('deleteMultipleTableRecordsUseCase')
    const deleteMultipleTableRecordsDto = await deleteMultipleTableRecordsUseCase.execute(
      app,
      tableId,
      ids
    )
    return c.json(deleteMultipleTableRecordsDto)
  }
}
