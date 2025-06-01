import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import type { UpdateRecordBody } from '@/table/domain/object-value/update-record-body.object-value'
import type { Table } from '@/table/domain/entity/table.entity'

@injectable()
export class UpdateRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(
    app: App,
    tableId: string,
    recordId: string,
    request: Request
  ): Promise<GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const exist = await this.recordRepository.exists(table, recordId)
    if (!exist) {
      throw new HttpError('Record not found', 404)
    }
    let body: unknown
    if (request.headers.get('content-type') === 'application/json') {
      body = request.body ? await request.json() : {}
    } else {
      throw new HttpError('Invalid content type', 400)
    }
    if (!this.validateUpdateRecordBody(table, body)) {
      throw new HttpError('Invalid record', 400)
    }
    await this.recordRepository.update(recordId, body.fields)
    const record = await this.recordRepository.read(table, recordId)
    if (!record) {
      throw new HttpError('Record not found', 404)
    }
    return toGetRecordDto(record)
  }

  validateUpdateRecordBody(table: Table, body: unknown): body is UpdateRecordBody {
    const schema = table.getSingleUpdateRecordSchema()
    return this.recordRepository.validateSchema(schema, body)
  }
}
