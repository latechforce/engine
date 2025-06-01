import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import { Record } from '@/table/domain/entity/record.entity'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import type { Table } from '@/table/domain/entity/table.entity'
import type { CreateRecordBody } from '@/table/domain/object-value/create-record-body.object-value'
import { toListRecordsDto, type ListRecordsDto } from '../dto/list-records.dto'
import type { Fields } from '@/table/domain/object-value/fields.object-value'

@injectable()
export class CreateRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(
    app: App,
    tableId: string,
    request: Request
  ): Promise<ListRecordsDto | GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    let body: unknown
    if (request.headers.get('content-type') === 'application/json') {
      body = request.body ? await request.json() : {}
    } else if (
      request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') ||
      request.headers.get('content-type')?.includes('multipart/form-data')
    ) {
      const formData = await request.formData()
      const fields: Fields = {}
      for (const [key, value] of formData.entries()) {
        const field = table.findField(key)
        switch (field?.schema.type) {
          case 'checkbox':
            fields[key] = value === 'true'
            break
          default:
            fields[key] = value
        }
      }
      body = { fields }
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateCreateRecordBody(table, body)) {
      throw new HttpError('Invalid record', 400)
    }
    if ('fields' in body) {
      const record = new Record(body.fields)
      await this.recordRepository.create(table, record)
      return toGetRecordDto(record)
    } else {
      const records = body.records.map((record) => new Record(record.fields))
      await this.recordRepository.createMany(table, records)
      return toListRecordsDto(records)
    }
  }

  validateCreateRecordBody(table: Table, body: unknown): body is CreateRecordBody {
    const schema = table.getSingleOrMultipleCreateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
