import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../app/domain/entity/app.entity'
import { toListRecordsDto, type ListRecordsDto } from '../dto/list-records.dto'

@injectable()
export class ListRecordsUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string): Promise<ListRecordsDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const records = await this.recordRepository.list(table)
    return toListRecordsDto(records, table)
  }
}
