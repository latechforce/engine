import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import type { DeleteRecordDto } from '../dto/delete-record.dto'

export class DeleteRecordUseCase {
  constructor(private readonly recordRepository: IRecordRepository) {}

  async execute(app: App, tableId: string, recordId: string): Promise<DeleteRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const exist = await this.recordRepository.exists(table, recordId)
    if (!exist) {
      throw new HttpError('Record not found', 404)
    }
    await this.recordRepository.delete(recordId)
    return {
      id: recordId,
      deleted: true,
    }
  }
}
