import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import { Record as RecordEntity } from '../../domain/entity/record.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import type { Table } from '../../domain/entity/table.entity'
import type { CreateRecordBody } from '../../domain/object-value/create-record-body.object-value'
import { toListRecordsDto, type ListRecordsDto } from '../dto/list-records.dto'
import type { Fields } from '../../domain/object-value/fields.object-value'
import { Object as ObjectEntity } from '../../../bucket/domain/entity/object.entity'
import type { IObjectRepository } from '../../../bucket/domain/repository-interface/object-repository.interface'

@injectable()
export class CreateRecordUseCase {
  constructor(
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository,
    @inject(TYPES.Bucket.Repository.Object)
    private readonly objectRepository: IObjectRepository
  ) {}

  async execute(
    app: App,
    tableId: string,
    request: Request,
    body: Record<string, unknown>
  ): Promise<ListRecordsDto | GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    let data: unknown
    const objects: ObjectEntity[] = []
    if (request.headers.get('content-type') === 'application/json') {
      data = body
    } else if (
      request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') ||
      request.headers.get('content-type')?.includes('multipart/form-data')
    ) {
      const fields: Fields = {}
      for (const key of Object.keys(body)) {
        const field = table.findField(key)
        const value = body[key]
        switch (field?.schema.type) {
          case 'checkbox':
            fields[key] = value === 'true'
            break
          case 'single-attachment':
            if (value instanceof File) {
              const data = await value.arrayBuffer()
              const object = new ObjectEntity(
                value.name,
                0,
                new Uint8Array(data),
                value.type,
                data.byteLength
              )
              objects.push(object)
              fields[key] = object.key
            } else {
              throw new HttpError('Invalid attachment', 400)
            }
            break
          default:
            if (value instanceof File) {
              throw new HttpError('Invalid attachment', 400)
            }
            fields[key] = String(value)
        }
      }
      data = { fields }
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateCreateRecordBody(table, data)) {
      const errors = this.getSchemaErrors(table, data)
      throw new HttpError(`Invalid record: ${errors.join(', ')}`, 400)
    }
    await Promise.all(objects.map((object) => this.objectRepository.create(object)))
    if ('fields' in data) {
      const record = new RecordEntity(data.fields)
      await this.recordRepository.create(table, record)
      return toGetRecordDto(record, table)
    } else {
      const records = data.records.map((record) => new RecordEntity(record.fields))
      await this.recordRepository.createMany(table, records)
      return toListRecordsDto(records)
    }
  }

  validateCreateRecordBody(table: Table, body: unknown): body is CreateRecordBody {
    const schema = table.getSingleOrMultipleCreateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }

  getSchemaErrors(table: Table, body: unknown): string[] {
    if (body && typeof body === 'object' && 'fields' in body) {
      return this.recordRepository.getSchemaErrors(table.getSingleCreateRecordSchema(), body)
    } else {
      return this.recordRepository.getSchemaErrors(table.getMultipleCreateRecordSchema(), body)
    }
  }
}
