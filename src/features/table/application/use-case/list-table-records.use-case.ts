import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { toMultipleRecordDto, type RecordDto } from '../dto/record.dto'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { App } from '@/app/domain/entity/app.entity'

@injectable()
export class ListTableRecordsUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string): Promise<RecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const records = await this.recordRepository.list(table)
    return toMultipleRecordDto(records)
  }
}
