# Steps to Add a New Integration Trigger

## 1. Domain Layer

1. Create trigger interface in `src/domain/interfaces/ITrigger/integrations/newIntegration/INewEvent.ts`:

```typescript
export interface INewEventTrigger {
  integration: 'NewIntegration'
  event: 'NewEvent'
}
```

2. Add trigger to `src/domain/interfaces/ITrigger/index.ts`:

```typescript
import type { INewEventTrigger } from './newIntegration/INewEvent'
export type ITrigger /* ... */ = INewEventTrigger
```

3. Create trigger entity in `src/domain/entities/Trigger/integrations/newIntegration/NewEvent.ts`:

```typescript
import type { Queue } from '/domain/services/Queue'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { NewIntegration } from '/domain/integrations/NewIntegration'
import type { PostRequest } from '../../Request'

export interface NewEventTriggerConfig extends BaseTriggerConfig {
  automation: string
}

export interface NewEventTriggerServices {
  queue: Queue
}

export interface NewEventTriggerIntegrations {
  newIntegration: NewIntegration
}

export class NewEventTrigger extends BaseTrigger<NewEventTriggerConfig> {
  constructor(
    config: NewEventTriggerConfig,
    private _services: NewEventTriggerServices,
    private _integrations: NewEventTriggerIntegrations
  ) {
    super(config)
  }

  validate = async () => {
    const { newIntegration } = this._integrations
    const { account } = this._config
    const accountExist = await newIntegration.checkAccountExist(account)
    if (!accountExist) {
      return [
        new ConfigError({
          entity: 'Trigger',
          name: 'NewEventTrigger',
          message: 'Account not found',
        }),
      ]
    }
    const response = await newIntegration.testConnection(account)
    if (response?.error) {
      return [
        new ConfigError({
          entity: 'Trigger',
          name: 'NewEventTrigger',
          message: response.error.message || 'Unknown error',
        }),
      ]
    }
    return []
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue } = this._services
    const { automation } = this._config
    const { newIntegration } = this._integrations

    // Add integration-specific initialization here

    queue.job(automation, run)
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, request.getBodyAsObject())
  }
}
```

4. Add trigger to `src/domain/entities/Trigger/index.ts`:

```typescript
import type { NewEventTrigger } from './newIntegration/NewEvent'
export type Trigger /* ... */ = NewEventTrigger
```

## 3. API Layer

1. Create trigger mapper in `src/adapter/api/mappers/Trigger/integrations/newIntegration/NewEventMapper.ts`:

```typescript
import {
  NewEventTrigger,
  type NewEventTriggerConfig,
  type NewEventTriggerIntegrations,
  type NewEventTriggerServices,
} from '/domain/entities/Trigger/newIntegration/NewEvent'

export class NewEventTriggerMapper {
  static toEntity = (
    config: NewEventTriggerConfig,
    services: NewEventTriggerServices,
    integration: NewEventTriggerIntegrations
  ): NewEventTrigger => {
    return new NewEventTrigger(config, services, integration)
  }
}
```

2. Update `src/adapter/api/mappers/Trigger/index.ts`:

```typescript
import { NewEventTriggerMapper } from './newIntegration/NewEventMapper'
import type { NewIntegration } from '/domain/integrations/NewIntegration'

export interface TriggerMapperIntegrations {
  // ... other integrations
  newIntegration: NewIntegration
}

export class TriggerMapper {
  static toEntity = (
    config: TriggerMapperConfig,
    services: TriggerMapperServices,
    integrations: TriggerMapperIntegrations
  ): Trigger => {
    const { event } = config
    switch (event) {
      // ... other cases
      case 'NewEvent':
        return NewEventTriggerMapper.toEntity(config, services, integrations)
      default:
        throw new Error(`TriggerMapper: trigger ${event} not found`)
    }
  }
}
```

## 4. Test Configuration

1. Add test configuration in `src/infrastructure/test/config.ts`:

```typescript
const fullConfig: Config = {
  automations: [
    // ... other automations
    {
      name: 'NewIntegrationNewEvent',
      trigger: {
        integration: 'NewIntegration',
        event: 'NewEvent',
      },
      actions: [],
    },
  ],
}
```

2. Update test types:

```typescript
type AutomationName =
  // ... other names
  'NewIntegrationNewEvent'
```

## 5. Mock Integration

1. Update `src/infrastructure/test/bun/Mock.ts`:

```typescript
type IntegrationType =
  // ... other types
  'NewIntegration'

// Add integration configuration and mock setup
if (this.options.integrations.includes('NewIntegration')) {
  const config: NewIntegrationConfig = {
    baseUrl: await getTestDbUrl('newIntegration'),
    token: 'test',
  }
  integrations.newIntegration = new NewIntegrationIntegration(config)
  extendsConfig.integrations.newIntegration = config
  await integrations.newIntegration.createToken('test')
}
```

## 6. Create Test File

Create `test/automations/triggers/integrations/newIntegration/newEvent.test.ts`:

```typescript
import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['NewIntegration'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on new event', () => {
    beforeEach(async () => {
      // Add integration-specific setup here
    })

    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getAutomationConfig('NewIntegrationNewEvent'),
      }
      await app.start(config)

      // WHEN
      // Add integration-specific trigger test here

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })
  })
})
```
