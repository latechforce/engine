import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import type { UpdateRecordBody } from '../../domain/object-value/update-record-body.object-value'
import type { Table } from '../../domain/entity/table.entity'
import type { Fields } from '../../domain/object-value/fields.object-value'
import { Object as ObjectEntity } from '../../../bucket/domain/entity/object.entity'
import type { IObjectRepository } from '../../../bucket/domain/repository-interface/object-repository.interface'

@injectable()
export class UpdateRecordUseCase {
  constructor(
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository,
    @inject(TYPES.Bucket.Repository.Object)
    private readonly objectRepository: IObjectRepository
  ) {}

  async execute(
    app: App,
    tableId: string,
    recordId: string,
    request: Request,
    body: Record<string, unknown>
  ): Promise<GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const exist = await this.recordRepository.exists(table, recordId)
    if (!exist) {
      throw new HttpError('Record not found', 404)
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
            }
            break
          default:
            if (value instanceof File) {
              break
            }
            fields[key] = String(value)
        }
      }
      data = { fields }
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateUpdateRecordBody(table, data)) {
      throw new HttpError('Invalid record', 400)
    }
    await Promise.all(objects.map((object) => this.objectRepository.create(object)))
    await this.recordRepository.update(table, recordId, data.fields)
    const record = await this.recordRepository.read(table, recordId)
    if (!record) {
      throw new HttpError('Record not found', 404)
    }
    return toGetRecordDto(record, table)
  }

  validateUpdateRecordBody(table: Table, body: unknown): body is UpdateRecordBody {
    const schema = table.getSingleUpdateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
