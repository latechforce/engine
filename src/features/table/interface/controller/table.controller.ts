import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class TableController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listTablesUseCase = c.get('listTablesUseCase')
    const listTablesDto = await listTablesUseCase.execute(app)
    return c.json(listTablesDto)
  }

  static async createRecord(
    c: Context<HonoType>,
    data: { tableId: string; body: Record<string, unknown> }
  ) {
    const app = c.get('app')
    const createRecordUseCase = c.get('createRecordUseCase')
    const createRecordDto = await createRecordUseCase.execute(
      app,
      data.tableId,
      c.req.raw,
      data.body
    )
    return c.json(createRecordDto, 201)
  }

  static async readRecord(c: Context<HonoType>, data: { tableId: string; recordId: string }) {
    const app = c.get('app')
    const readRecordUseCase = c.get('readRecordUseCase')
    const readRecordDto = await readRecordUseCase.execute(app, data.tableId, data.recordId)
    return c.json(readRecordDto)
  }

  static async listRecords(c: Context<HonoType>, data: { tableId: string }) {
    const app = c.get('app')
    const listRecordsUseCase = c.get('listRecordsUseCase')
    const listRecordsDto = await listRecordsUseCase.execute(app, data.tableId)
    return c.json(listRecordsDto)
  }

  static async updateRecord(
    c: Context<HonoType>,
    data: { tableId: string; recordId: string; body: Record<string, unknown> }
  ) {
    const app = c.get('app')
    const updateRecordUseCase = c.get('updateRecordUseCase')
    const updateRecordDto = await updateRecordUseCase.execute(
      app,
      data.tableId,
      data.recordId,
      c.req.raw,
      data.body
    )
    return c.json(updateRecordDto)
  }

  static async updateMultipleRecords(c: Context<HonoType>, data: { tableId: string }) {
    const app = c.get('app')
    const updateMultipleRecordsUseCase = c.get('updateMultipleRecordsUseCase')
    const updateMultipleRecordsDto = await updateMultipleRecordsUseCase.execute(
      app,
      data.tableId,
      c.req.raw
    )
    return c.json(updateMultipleRecordsDto)
  }

  static async deleteRecord(c: Context<HonoType>, data: { tableId: string; recordId: string }) {
    const app = c.get('app')
    const deleteRecordUseCase = c.get('deleteRecordUseCase')
    const deleteRecordDto = await deleteRecordUseCase.execute(app, data.tableId, data.recordId)
    return c.json(deleteRecordDto)
  }

  static async deleteMultipleRecords(
    c: Context<HonoType>,
    data: { tableId: string; ids: string[] }
  ) {
    const app = c.get('app')
    const deleteMultipleRecordsUseCase = c.get('deleteMultipleRecordsUseCase')
    const deleteMultipleRecordsDto = await deleteMultipleRecordsUseCase.execute(
      app,
      data.tableId,
      data.ids
    )
    return c.json(deleteMultipleRecordsDto)
  }
}
