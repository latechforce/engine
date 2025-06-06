import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { toGetRecordDto, type GetRecordDto } from '../dto/get-record.dto'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../app/domain/entity/app.entity'

@injectable()
export class ReadRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, recordId: string): Promise<GetRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const record = await this.recordRepository.read(table, recordId)
    if (!record) {
      throw new HttpError('Record not found', 404)
    }
    return toGetRecordDto(record, table)
  }
}
