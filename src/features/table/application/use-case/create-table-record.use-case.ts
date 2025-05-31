import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import { Record } from '@/table/domain/entity/record.entity'
import type {
  IRecordRepository,
  RecordTransaction,
} from '@/table/domain/repository-interface/record-repository.interface'
import { toRecordDto } from '../dto/record.dto'
import type { RecordDto } from '../dto/record.dto'

@injectable()
export class CreateTableRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, body: unknown): Promise<RecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const schema = table.getRecordFieldsSchema()
    if (!this.recordRepository.validateFields(schema, body)) {
      throw new HttpError('Invalid record', 400)
    }
    const record = new Record(body)
    await this.recordRepository.transaction(async (tx: RecordTransaction) => {
      await tx.create(table.schema.id, record)
      for (const field of table.schema.fields) {
        await tx.field.create(field.id, record, record.fields[field.name])
      }
    })
    return toRecordDto(record)
  }
}
