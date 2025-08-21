export interface DomainEvent {
  aggregateId: string
  aggregateType: string
  eventType: string
  payload: unknown
  occurredOn: Date
}
