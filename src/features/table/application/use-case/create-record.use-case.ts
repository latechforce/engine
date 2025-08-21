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
import type { IDomainEventPublisher } from '../../../../shared/domain/event/domain-event-publisher.interface'
import { RecordCreatedEvent } from '../../domain/event/record-created.event'

export class CreateRecordUseCase {
  constructor(
    private readonly recordRepository: IRecordRepository,
    private readonly objectRepository: IObjectRepository,
    private readonly eventPublisher: IDomainEventPublisher
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

      // Emit domain event
      await this.eventPublisher.publish(
        new RecordCreatedEvent(table.schema.id.toString(), {
          tableId: table.schema.id.toString(),
          recordId: record.id,
          fields: record.fields,
        })
      )

      return toGetRecordDto(record, table)
    } else {
      const records = data.records.map((record) => new RecordEntity(record.fields))
      await this.recordRepository.createMany(table, records)

      // Emit domain events for multiple records
      const events = records.map(
        (record) =>
          new RecordCreatedEvent(table.schema.id.toString(), {
            tableId: table.schema.id.toString(),
            recordId: record.id,
            fields: record.fields,
          })
      )
      await this.eventPublisher.publishMany(events)

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
