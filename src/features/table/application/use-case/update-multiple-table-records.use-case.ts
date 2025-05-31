import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type {
  IRecordRepository,
  RecordTransaction,
} from '@/table/domain/repository-interface/record-repository.interface'
import { toMultipleRecordDto } from '../dto/record.dto'
import type { RecordDto } from '../dto/record.dto'
import type { MultipleUpdateRecordBody } from '@/table/domain/object-value/update-record-body.object-value'
import type { Table } from '@/table/domain/entity/table.entity'

@injectable()
export class UpdateMultipleTableRecordsUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, request: Request): Promise<RecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    let body: unknown
    if (request.headers.get('content-type') === 'application/json') {
      body = request.body ? await request.json() : {}
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateUpdateMultipleRecordBody(table, body)) {
      throw new HttpError('Invalid record', 400)
    }
    await this.recordRepository.transaction(async (tx: RecordTransaction) => {
      for (const record of body.records) {
        const fields = await tx.field.listByRecordId(record.id)
        for (const key of Object.keys(record.fields)) {
          const field = fields.find((field) => field.name === key)
          if (field) await tx.field.update(field.id, record.fields[key])
        }
        await tx.update(record.id)
      }
    })
    const records = await this.recordRepository.listByIds(
      table,
      body.records.map((record) => record.id)
    )
    return toMultipleRecordDto(records)
  }

  validateUpdateMultipleRecordBody(table: Table, body: unknown): body is MultipleUpdateRecordBody {
    const schema = table.getMultipleUpdateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
