import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import { Record } from '../../domain/entity/record.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import type { Table } from '../../domain/entity/table.entity'
import type { CreateRecordBody } from '../../domain/object-value/create-record-body.object-value'
import { toListRecordsDto, type ListRecordsDto } from '../dto/list-records.dto'
import type { Fields } from '../../domain/object-value/fields.object-value'
import { Object } from '../../../bucket/domain/entity/object.entity'
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
    request: Request
  ): Promise<ListRecordsDto | GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    let body: unknown
    const objects: Object[] = []
    if (request.headers.get('content-type') === 'application/json') {
      body = request.body ? await request.json() : {}
    } else if (
      request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') ||
      request.headers.get('content-type')?.includes('multipart/form-data')
    ) {
      const formData = await request.formData()
      const fields: Fields = {}
      for (const key of formData.keys()) {
        const field = table.findField(key)
        const value = formData.get(key)
        switch (field?.schema.type) {
          case 'checkbox':
            fields[key] = value === 'true'
            break
          case 'single-attachment':
            if (value instanceof File) {
              const data = await value.arrayBuffer()
              const object = new Object(
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
    await Promise.all(objects.map((object) => this.objectRepository.create(object)))
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
