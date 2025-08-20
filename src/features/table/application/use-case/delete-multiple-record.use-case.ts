import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import type { DeleteMultipleRecordsDto } from '../dto/delete-multiple-records.dto'

export class DeleteMultipleRecordsUseCase {
  constructor(private readonly recordRepository: IRecordRepository) {}

  async execute(
    app: App,
    tableId: string,
    recordIds?: string[]
  ): Promise<DeleteMultipleRecordsDto> {
    if (!recordIds || recordIds.length === 0) {
      throw new HttpError('Record IDs are required', 400)
    }
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const records = await this.recordRepository.listByIds(table, recordIds)
    if (records.length !== recordIds.length) {
      throw new HttpError('Record not found', 404)
    }
    await this.recordRepository.deleteMany(recordIds)
    return {
      records: recordIds.map((id) => ({
        id,
        deleted: true,
      })),
    }
  }
}
