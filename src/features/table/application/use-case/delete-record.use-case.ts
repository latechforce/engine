import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import type { DeleteRecordDto } from '../dto/delete-record.dto'

@injectable()
export class DeleteRecordUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, tableId: string, recordId: string): Promise<DeleteRecordDto> {
    const table = app.findTable(tableId)
    if (!table) {
      throw new HttpError('Table not found', 404)
    }
    const exist = await this.recordRepository.exists(table, recordId)
    if (!exist) {
      throw new HttpError('Record not found', 404)
    }
    await this.recordRepository.transaction(async (tx) => {
      const fields = await tx.field.listByRecordId(recordId)
      for (const field of fields) {
        await tx.field.delete(field.id)
      }
      await tx.delete(recordId)
    })
    return {
      id: recordId,
      deleted: true,
    }
  }
}
