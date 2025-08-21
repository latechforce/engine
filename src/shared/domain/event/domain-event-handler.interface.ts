import type { DomainEvent } from './domain-event.interface'

export interface IDomainEventHandler<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void>
  canHandle(event: DomainEvent): boolean
}
