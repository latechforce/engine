import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { App } from '@/app/domain/entity/app.entity'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import type { DeleteMultipleRecordsDto } from '../dto/delete-multiple-records.dto'

@injectable()
export class DeleteMultipleRecordsUseCase {
  constructor(
    @inject(TYPES.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

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
    await this.recordRepository.transaction(async (tx) => {
      for (const recordId of recordIds) {
        const record = await tx.exists(recordId)
        if (!record) {
          throw new HttpError('Record not found', 404)
        }
        const fields = await tx.field.listByRecordId(recordId)
        for (const field of fields) {
          await tx.field.delete(field.id)
        }
        await tx.delete(recordId)
      }
    })
    return {
      records: recordIds.map((id) => ({
        id,
        deleted: true,
      })),
    }
  }
}
