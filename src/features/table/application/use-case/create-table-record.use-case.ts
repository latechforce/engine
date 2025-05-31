import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import { Record } from '@/table/domain/entity/record.entity'
import type {
  IRecordRepository,
  RecordTransaction,
} from '@/table/domain/repository-interface/record-repository.interface'
import { toMultipleRecordDto, toSingleRecordDto } from '../dto/record.dto'
import type { RecordDto } from '../dto/record.dto'
import type { Table } from '@/table/domain/entity/table.entity'
import type { CreateRecordBody } from '@/table/domain/object-value/create-record-body.object-value'

@injectable()
export class CreateTableRecordUseCase {
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
    } else if (
      request.headers.get('content-type') === 'application/x-www-form-urlencoded' ||
      request.headers.get('content-type') === 'multipart/form-data'
    ) {
      const formData = await request.formData()
      body = { fields: Object.fromEntries(Array.from(formData.entries())) }
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateCreateRecordBody(table, body)) {
      throw new HttpError('Invalid record', 400)
    }
    if ('fields' in body) {
      const record = new Record(body.fields)
      await this.recordRepository.transaction(async (tx: RecordTransaction) => {
        await tx.create(table.schema.id, record)
        for (const field of table.schema.fields) {
          await tx.field.create(field.id, record, record.fields[field.name])
        }
      })
      return toSingleRecordDto(record)
    } else {
      const records = body.records.map((record) => new Record(record.fields))
      await this.recordRepository.transaction(async (tx: RecordTransaction) => {
        for (const record of records) {
          await tx.create(table.schema.id, record)
          for (const field of table.schema.fields) {
            await tx.field.create(field.id, record, record.fields[field.name])
          }
        }
      })
      return toMultipleRecordDto(records)
    }
  }

  validateCreateRecordBody(table: Table, body: unknown): body is CreateRecordBody {
    const schema = table.getSingleOrMultipleCreateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
