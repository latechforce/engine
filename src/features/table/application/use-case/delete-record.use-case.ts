import type { App } from '../../../app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IRecordRepository } from '../../domain/repository-interface/record-repository.interface'
import type { DeleteRecordDto } from '../dto/delete-record.dto'
import type { IDomainEventPublisher } from '../../../../shared/domain/event/domain-event-publisher.interface'
import { RecordDeletedEvent } from '../../domain/event/record-deleted.event'

export class DeleteRecordUseCase {
  constructor(
    private readonly recordRepository: IRecordRepository,
    private readonly eventPublisher: IDomainEventPublisher
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

    // Get the record before deletion to capture its fields
    const recordToDelete = await this.recordRepository.read(table, recordId)
    if (!recordToDelete) {
      throw new HttpError('Record not found', 404)
    }

    await this.recordRepository.delete(recordId)

    // Emit domain event
    await this.eventPublisher.publish(
      new RecordDeletedEvent(table.schema.id.toString(), {
        tableId: table.schema.id.toString(),
        recordId: recordId,
        deletedFields: recordToDelete.fields,
      })
    )

    return {
      id: recordId,
      deleted: true,
    }
  }
}
