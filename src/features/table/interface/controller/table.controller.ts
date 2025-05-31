import type { Context } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'

export class TableController {
  static async createRecord(c: Context<HonoType>) {
    const app = c.get('app')
    const tableId = c.req.param('tableId')
    const body = await c.req.json()
    const createTableRecordUseCase = c.get('createTableRecordUseCase')
    const createTableRecordDto = await createTableRecordUseCase.execute(app, tableId, body)
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
}
