import type { DomainEvent } from './domain-event.interface'

export interface IDomainEventPublisher {
  publish(event: DomainEvent): Promise<void>
  publishMany(events: DomainEvent[]): Promise<void>
}
