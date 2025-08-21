# Feature Development Guide

This guide covers the complete process of developing a new feature in the LaTeChforce Engine, from planning to deployment.

## 1. Planning Phase

### Define Domain Boundaries

Before writing code, clearly define:

1. **Feature Responsibility**: What does this feature do?
2. **Domain Language**: What are the key concepts and terms?
3. **Aggregate Boundaries**: What entities belong together?
4. **Integration Points**: How does it interact with other features?

### Example: Planning a "Notification" Feature

```
Domain: Notification Management
Responsibility: Send and track notifications across multiple channels
Key Concepts: Notification, Channel, Template, Delivery
Aggregate Root: Notification
Entities: NotificationTemplate, DeliveryAttempt
Value Objects: Channel, RecipientAddress, Priority
```

## 2. Architecture Design

### Create Architecture Decision Record

Document significant decisions:

```bash
# Copy the ADR template
cp docs/architecture/adr-template.md docs/architecture/adr-004-notification-system.md
```

### Define Integration Strategy

Determine how your feature integrates:

- **Events Published**: What domain events will you emit?
- **Events Consumed**: What events from other features do you need?
- **External Services**: Do you need anti-corruption layers?
- **Shared Dependencies**: What shared services will you use?

## 3. Code Generation

### Generate Feature Scaffold

Use the code generation CLI to create the basic structure:

```bash
# Generate complete feature
bun run generate:feature notification --full

# Or generate specific components
bun run generate:feature notification --entity --repository --use-case --controller --events
```

This creates the complete directory structure with all necessary files.

## 4. Domain Implementation

### 4.1 Define Value Objects

Start with value objects that represent core domain concepts:

```typescript
// src/features/notification/domain/value-object/channel.value-object.ts
export class Channel {
  private static readonly VALID_CHANNELS = ['email', 'sms', 'push', 'webhook'] as const
  
  constructor(private readonly value: typeof Channel.VALID_CHANNELS[number]) {
    if (!Channel.VALID_CHANNELS.includes(value)) {
      throw new Error(`Invalid channel: ${value}`)
    }
  }
  
  getValue(): string {
    return this.value
  }
  
  isEmail(): boolean {
    return this.value === 'email'
  }
}
```

### 4.2 Implement Domain Entity

Build your aggregate root and related entities:

```typescript
// src/features/notification/domain/entity/notification.entity.ts
export class Notification {
  constructor(
    public readonly id: Id,
    public readonly recipientId: Id,
    public readonly channel: Channel,
    public readonly template: NotificationTemplate,
    public readonly status: NotificationStatus,
    public readonly scheduledAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
  
  send(): Notification {
    if (this.status.isSent()) {
      throw new Error('Notification already sent')
    }
    
    return new Notification(
      this.id,
      this.recipientId,
      this.channel,
      this.template,
      NotificationStatus.sent(),
      this.scheduledAt,
      this.createdAt,
      new Date()
    )
  }
}
```

### 4.3 Create Domain Events

Define events for cross-feature communication:

```typescript
// src/features/notification/domain/event/notification-sent.event.ts
export class NotificationSentEvent implements DomainEvent {
  public readonly aggregateType = 'notification'
  public readonly eventType = 'notification-sent'
  public readonly occurredOn: Date

  constructor(
    public readonly aggregateId: string,
    public readonly payload: {
      notificationId: number
      recipientId: number
      channel: string
      sentAt: Date
    }
  ) {
    this.occurredOn = new Date()
  }
}
```

## 5. Application Layer

### 5.1 Implement Use Cases

Create focused use cases for each business operation:

```typescript
// src/features/notification/application/use-case/send-notification.use-case.ts
export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly eventPublisher: IDomainEventPublisher,
    private readonly notificationService: INotificationService
  ) {}

  async execute(input: SendNotificationInput): Promise<void> {
    const notification = await this.notificationRepository.findById(new Id(input.notificationId))
    if (!notification) {
      throw new Error('Notification not found')
    }

    // Send through external service
    await this.notificationService.send(notification)
    
    // Update domain state
    const sentNotification = notification.send()
    await this.notificationRepository.save(sentNotification)
    
    // Emit domain event
    await this.eventPublisher.publish(
      new NotificationSentEvent(
        sentNotification.id.toString(),
        {
          notificationId: sentNotification.id.getValue(),
          recipientId: sentNotification.recipientId.getValue(),
          channel: sentNotification.channel.getValue(),
          sentAt: new Date()
        }
      )
    )
  }
}
```

### 5.2 Define DTOs

Create data transfer objects for API boundaries:

```typescript
// src/features/notification/application/dto/notification.dto.ts
export interface CreateNotificationDto {
  recipientId: number
  channel: 'email' | 'sms' | 'push' | 'webhook'
  templateId: number
  scheduledAt?: string
  variables?: Record<string, unknown>
}

export interface NotificationResponseDto {
  id: number
  recipientId: number
  channel: string
  status: string
  scheduledAt: string
  createdAt: string
  updatedAt: string
}
```

## 6. Infrastructure Layer

### 6.1 Implement Repository

Create concrete repository implementation:

```typescript
// src/features/notification/infrastructure/repository/notification.repository.ts
export class NotificationRepository implements INotificationRepository {
  constructor(
    private readonly database: DatabaseService,
    private readonly logger: LoggerService
  ) {}

  async findById(id: Id): Promise<Notification | null> {
    const row = await this.database.selectOne('notifications', { id: id.getValue() })
    return row ? this.toDomain(row) : null
  }

  async save(notification: Notification): Promise<Notification> {
    const data = this.toPersistence(notification)
    const row = await this.database.upsert('notifications', data)
    return this.toDomain(row)
  }

  private toDomain(row: any): Notification {
    // Transform database row to domain entity
  }

  private toPersistence(notification: Notification): any {
    // Transform domain entity to database row
  }
}
```

### 6.2 Create External Services

Implement services for external communication:

```typescript
// src/features/notification/infrastructure/service/notification.service.ts
export class NotificationService implements INotificationService {
  constructor(
    private readonly httpService: IHttpService,
    private readonly emailACL: EmailAntiCorruptionLayer,
    private readonly logger: LoggerService
  ) {}

  async send(notification: Notification): Promise<void> {
    switch (notification.channel.getValue()) {
      case 'email':
        await this.sendEmail(notification)
        break
      case 'sms':
        await this.sendSms(notification)
        break
      default:
        throw new Error(`Unsupported channel: ${notification.channel.getValue()}`)
    }
  }

  private async sendEmail(notification: Notification): Promise<void> {
    const emailData = this.emailACL.toExternal(notification)
    await this.httpService.post('/send-email', emailData)
  }
}
```

## 7. Interface Layer

### 7.1 Implement Controller

Create HTTP controllers for API endpoints:

```typescript
// src/features/notification/interface/controller/notification.controller.ts
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly listNotificationsUseCase: ListNotificationsUseCase
  ) {}

  setupRoutes(): Hono {
    const app = new Hono()

    app.post('/', async (c) => {
      const body: CreateNotificationDto = await c.req.json()
      const notification = await this.createNotificationUseCase.execute(body)
      return c.json({ data: notification }, 201)
    })

    app.post('/:id/send', async (c) => {
      const id = parseInt(c.req.param('id'))
      await this.sendNotificationUseCase.execute({ notificationId: id })
      return c.json({ message: 'Notification sent successfully' })
    })

    return app
  }
}
```

### 7.2 Configure Routes

Set up routing configuration:

```typescript
// src/features/notification/interface/routes.ts
import { Hono } from 'hono'
import type { NotificationController } from './controller/notification.controller'

export function createNotificationRoutes(controller: NotificationController): Hono {
  const app = new Hono()
  app.route('/notifications', controller.setupRoutes())
  return app
}
```

## 8. Dependency Injection

### 8.1 Create Feature Factory

Set up dependency injection for your feature:

```typescript
// src/features/notification/infrastructure/factory.ts
export function createNotificationServices(container: SimpleContainer) {
  // Get shared dependencies
  const database = container.get('database')
  const logger = container.get('logger')
  const httpService = container.get('httpService')
  const eventPublisher = container.get('eventPublisher')

  // Create services
  const notificationRepository = new NotificationRepository(database, logger)
  const notificationService = new NotificationService(httpService, logger)
  
  // Create use cases
  const createNotificationUseCase = new CreateNotificationUseCase(
    notificationRepository, 
    eventPublisher
  )
  const sendNotificationUseCase = new SendNotificationUseCase(
    notificationRepository,
    eventPublisher,
    notificationService
  )

  // Create controller
  const notificationController = new NotificationController(
    createNotificationUseCase,
    sendNotificationUseCase
  )

  // Register in container
  container.set('notificationRepository', notificationRepository)
  container.set('notificationController', notificationController)

  return {
    repository: notificationRepository,
    controller: notificationController,
    routes: notificationController.setupRoutes()
  }
}
```

### 8.2 Register in Main Factory

Add your feature to the main application factory:

```typescript
// src/shared/infrastructure/di/factory.ts
import { createNotificationServices } from '../../../features/notification/infrastructure/factory'

export async function createAllServices(/* ... */) {
  // ... existing code ...
  
  // Add notification services
  const notification = createNotificationServices(container)
  
  return {
    // ... existing services ...
    notification
  }
}
```

## 9. Testing

### 9.1 Unit Tests

Test domain logic in isolation:

```typescript
// test/features/notification/domain/entity/notification.test.ts
describe('Notification', () => {
  it('should throw error when sending already sent notification', () => {
    const notification = new Notification(/* ... sent status ... */)
    
    expect(() => notification.send()).toThrow('Notification already sent')
  })
})
```

### 9.2 Integration Tests

Test use cases with mocked dependencies:

```typescript
// test/features/notification/application/use-case/send-notification.test.ts
describe('SendNotificationUseCase', () => {
  it('should send notification and emit event', async () => {
    const mockRepository = createMockRepository()
    const mockEventPublisher = createMockEventPublisher()
    const useCase = new SendNotificationUseCase(mockRepository, mockEventPublisher)
    
    await useCase.execute({ notificationId: 1 })
    
    expect(mockEventPublisher.publish).toHaveBeenCalledWith(
      expect.any(NotificationSentEvent)
    )
  })
})
```

### 9.3 Architecture Tests

Ensure your feature follows architectural rules:

```bash
# Run architecture tests
bun test test/architecture/architecture-rules.test.ts
```

## 10. Documentation

### 10.1 Update Aggregate Boundaries

Add your feature to the aggregate boundaries documentation:

```markdown
# docs/architecture/aggregate-boundaries.md

## Notification Aggregate
- **Aggregate Root**: Notification
- **Entities**: NotificationTemplate, DeliveryAttempt
- **Value Objects**: Channel, RecipientAddress, Priority
- **Events**: NotificationCreated, NotificationSent, NotificationFailed
```

### 10.2 Create API Documentation

Document your API endpoints and examples.

## 11. Best Practices Checklist

- [ ] Domain logic is pure and testable
- [ ] No cross-feature imports in domain layer
- [ ] Use cases are focused and single-purpose
- [ ] Repository interface defined in domain
- [ ] Domain events emitted for important operations
- [ ] Anti-corruption layers used for external APIs
- [ ] Comprehensive test coverage
- [ ] Architecture tests pass
- [ ] Documentation updated
- [ ] Code follows established patterns

## 12. Common Pitfalls

### Avoid These Mistakes

1. **Direct Feature Dependencies**: Never import directly from other features
2. **Anemic Domain Model**: Ensure domain entities have behavior, not just data
3. **Fat Controllers**: Keep controllers thin, business logic belongs in use cases
4. **Infrastructure in Domain**: Domain should never depend on infrastructure
5. **Missing Events**: Emit domain events for important state changes
6. **Poor Error Handling**: Use domain-specific exceptions and proper error responses

### Performance Considerations

1. **Database Queries**: Use appropriate indexes and query optimization
2. **External Calls**: Implement proper timeout and retry mechanisms
3. **Event Processing**: Consider asynchronous processing for non-critical events
4. **Caching**: Add caching for frequently accessed data

## 13. Deployment

### Pre-deployment Checklist

- [ ] All tests pass
- [ ] Architecture tests pass
- [ ] Performance tests completed
- [ ] Documentation updated
- [ ] Security review completed
- [ ] Database migrations prepared
- [ ] Monitoring and logging configured

Your feature is now ready for deployment following the established patterns and best practices of the LaTeChforce Engine!