import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import type { MultipleUpdateRecordBody } from '../../domain/object-value/update-record-body.object-value'
import type { Table } from '../../domain/entity/table.entity'
import { toListRecordsDto, type ListRecordsDto } from '../dto/list-records.dto'

@injectable()
export class UpdateMultipleRecordsUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, request: Request): Promise<ListRecordsDto> {
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
    await this.recordRepository.updateMany(body.records)
    const records = await this.recordRepository.listByIds(
      table,
      body.records.map((record) => record.id)
    )
    return toListRecordsDto(records, table)
  }

  validateUpdateMultipleRecordBody(table: Table, body: unknown): body is MultipleUpdateRecordBody {
    const schema = table.getMultipleUpdateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
