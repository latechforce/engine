import type { DomainEvent } from '../../domain/event/domain-event.interface'
import type { IDomainEventPublisher } from '../../domain/event/domain-event-publisher.interface'
import type { IDomainEventHandler } from '../../domain/event/domain-event-handler.interface'

export class DomainEventPublisherService implements IDomainEventPublisher {
  private handlers: IDomainEventHandler[] = []

  registerHandler(handler: IDomainEventHandler): void {
    this.handlers.push(handler)
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlersForEvent = this.handlers.filter((handler) => handler.canHandle(event))

    await Promise.all(handlersForEvent.map((handler) => handler.handle(event)))
  }

  async publishMany(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.publish(event)))
  }
}
