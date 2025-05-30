import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { JSONSchema7 } from 'json-schema'
import type { FieldSchema } from '@/table/domain/schema/field'
import { Record } from '@/table/domain/entity/record.entity'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { toRecordDto } from '../dto/record.dto'
import type { RecordDto } from '../dto/record.dto'

@injectable()
export class CreateTableRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, body: unknown): Promise<RecordDto> {
    const table = app.tables.find(
      (t) => t.schema.id === Number(tableId) || t.schema.name === tableId
    )
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const schema = this.getRecordSchema(table.schema.fields)
    if (!this.recordRepository.validate(schema, body)) {
      throw new HttpError('Invalid record', 400)
    }
    const record = new Record(body)
    await this.recordRepository.transaction(async (tx) => {
      await tx.create(table.schema.id, record)
      for (const field of table.schema.fields) {
        await tx.field.create(field.id, record, record.fields[field.name])
      }
    })
    return toRecordDto(record)
  }

  private getRecordSchema(fields: FieldSchema[]): JSONSchema7 {
    return {
      type: 'object',
      properties: fields.reduce((acc: { [key: string]: JSONSchema7 }, field) => {
        switch (field.type) {
          case 'single-line-text':
          case 'long-text':
            acc[field.name] = { type: 'string' }
            break
        }
        return acc
      }, {}),
      required: fields.filter((field) => field.required).map((field) => field.name),
    }
  }
}
