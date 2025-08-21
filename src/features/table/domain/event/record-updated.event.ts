import type { DomainEvent } from '../../../../shared/domain/event/domain-event.interface'
import type { Fields } from '../object-value/fields.object-value'

export class RecordUpdatedEvent implements DomainEvent {
  public readonly aggregateType = 'table'
  public readonly eventType = 'record-updated'
  public readonly occurredOn: Date

  constructor(
    public readonly aggregateId: string,
    public readonly payload: {
      tableId: string
      recordId: string
      fields: Fields
      previousFields?: Fields
    }
  ) {
    this.occurredOn = new Date()
  }
}
