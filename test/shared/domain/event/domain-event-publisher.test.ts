import { describe, it, expect, beforeEach } from 'bun:test'
import { DomainEventPublisherService } from '../../../../src/shared/infrastructure/service/domain-event-publisher.service'
import { RecordCreatedEvent } from '../../../../src/features/table/domain/event/record-created.event'
import type { IDomainEventHandler } from '../../../../src/shared/domain/event/domain-event-handler.interface'
import type { DomainEvent } from '../../../../src/shared/domain/event/domain-event.interface'

describe('DomainEventPublisher', () => {
  let publisher: DomainEventPublisherService
  let mockHandler: IDomainEventHandler
  let handledEvents: DomainEvent[]

  beforeEach(() => {
    publisher = new DomainEventPublisherService()
    handledEvents = []
    
    mockHandler = {
      canHandle: (event: DomainEvent) => event.eventType === 'record-created',
      handle: async (event: DomainEvent) => {
        handledEvents.push(event)
      }
    }
    
    publisher.registerHandler(mockHandler)
  })

  it('should publish and handle domain events', async () => {
    const event = new RecordCreatedEvent('table-1', {
      tableId: 'table-1',
      recordId: 'record-1',
      fields: { name: 'Test Record' }
    })

    await publisher.publish(event)

    expect(handledEvents).toHaveLength(1)
    expect(handledEvents[0]).toBe(event)
    expect(handledEvents[0]?.eventType).toBe('record-created')
    expect(handledEvents[0]?.aggregateType).toBe('table')
  })

  it('should publish multiple events', async () => {
    const events = [
      new RecordCreatedEvent('table-1', {
        tableId: 'table-1',
        recordId: 'record-1',
        fields: { name: 'Test Record 1' }
      }),
      new RecordCreatedEvent('table-1', {
        tableId: 'table-1',
        recordId: 'record-2',
        fields: { name: 'Test Record 2' }
      })
    ]

    await publisher.publishMany(events)

    expect(handledEvents).toHaveLength(2)
    expect(handledEvents[0]?.payload).toEqual({
      tableId: 'table-1',
      recordId: 'record-1',
      fields: { name: 'Test Record 1' }
    })
    expect(handledEvents[1]?.payload).toEqual({
      tableId: 'table-1',
      recordId: 'record-2',
      fields: { name: 'Test Record 2' }
    })
  })

  it('should not handle events when no matching handler', async () => {
    const unhandledHandler: IDomainEventHandler = {
      canHandle: () => false,
      handle: async () => {
        handledEvents.push({ aggregateId: 'test', aggregateType: 'test', eventType: 'unhandled', payload: {}, occurredOn: new Date() })
      }
    }

    const publisher2 = new DomainEventPublisherService()
    publisher2.registerHandler(unhandledHandler)

    const event = new RecordCreatedEvent('table-1', {
      tableId: 'table-1',
      recordId: 'record-1',
      fields: { name: 'Test Record' }
    })

    await publisher2.publish(event)

    expect(handledEvents).toHaveLength(0)
  })
})