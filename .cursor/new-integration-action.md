I'll create a template notepad for creating new integration actions based on the GoCardless implementation pattern. I'll break it down into the required files and structure.

# Integration Action Template Guide

## 1. Domain Layer

### a. Integration Interface (`/domain/integrations/[Integration].ts`)
```typescript
export interface [Integration]Config {
  // Configuration properties
}

export interface I[Integration]Spi {
  getConfig: () => [Integration]Config
  [actionName]: ([actionInput]: [ActionInput]) => Promise<[ActionOutput]>
}

export class [Integration] {
  constructor(private _spi: I[Integration]Spi) {}

  getConfig = (): [Integration]Config => {
    return this._spi.getConfig()
  }

  [actionName] = async ([actionInput]: [ActionInput]): Promise<[ActionOutput]> => {
    return this._spi.[actionName]([actionInput])
  }
}

export interface [ActionInput] {
  // Input type definition
}

export interface [ActionOutput] {
  // Output type definition
}
```

### b. Action Entity (`/domain/entities/Action/[integration]/[Action].ts`)
```typescript
import { BaseAction, type BaseActionConfig, type BaseActionServices } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { [Integration], [ActionInput], [ActionOutput] } from '/domain/integrations/[Integration]'
import {
  Template,
  type ConvertToTemplateObjectCompiled,
  type ConvertToTemplateObjectFilled,
} from '/domain/services/Template'

type [Integration][Action]AsTemplateObjectCompiled = ConvertToTemplateObjectCompiled<[ActionInput]>
type [Integration][Action]AsTemplateObjectFilled = ConvertToTemplateObjectFilled<[ActionInput]>

export interface [Action][Integration]ActionConfig extends BaseActionConfig {
  [inputProperty]: [ActionInput]
}

export interface [Action][Integration]ActionServices extends BaseActionServices {
  templateCompiler: TemplateCompiler
}

export interface [Action][Integration]ActionIntegrations {
  [integrationInstance]: [Integration]
}

type Input = { [inputProperty]: [ActionInput] }
type Output = [ActionOutput]

export class [Action][Integration]Action extends BaseAction<Input, Output> {
  private _[inputProperty]: [Integration][Action]AsTemplateObjectCompiled

  constructor(
    config: [Action]Config,
    services: [Action]Services,
    private _integrations: [Action]Integrations
  ) {
    super(config, services)
    const { [inputProperty] } = config
    const { templateCompiler } = services
    const [inputProperty]Checked = this._checkTemplateObject([inputProperty])
    this._[inputProperty] = templateCompiler.compileObject<[Integration][Action]AsTemplateObjectCompiled>([inputProperty]Checked)
    _integrations.[integrationInstance].getConfig()
  }

  protected _prepare = async (context: AutomationContext) => {
    return {
      [inputProperty]: Template.fillObject<[Integration][Action]AsTemplateObjectFilled>(
        this._[inputProperty],
        context.data
      ),
    }
  }

  protected _process = async (input: Input) => {
    return this._integrations.[integrationInstance].[actionName](input.[inputProperty])
  }
}
```

## 2. Interface Layer

### a. Action Interface (`/domain/interfaces/IAction/[integration]/I[Action].ts`)
```typescript
import type { [Action][Integration]ActionConfig } from '/domain/entities/Action/[integration]/[Action]'

export interface I[Action][Integration]Action extends [Action][Integration]ActionConfig {
  integration: '[Integration]'
  action: '[Action]'
}
```

## 3. Adapter Layer

### a. Action Mapper (`/adapter/api/mappers/Action/[integration]/[Action]Mapper.ts`)
```typescript
import {
  [Action],
  type [Action]Config,
  type [Action]Services,
  type [Action]Integrations,
} from '/domain/entities/Action/[integration]/[Action]'

export type [Action]MapperServices = [Action]Services
export type [Action]MapperIntegrations = [Action]Integrations

export class [Action]Mapper {
  static toEntity = (
    config: [Action]Config,
    services: [Action]MapperServices,
    integrations: [Action]MapperIntegrations
  ): [Action] => {
    return new [Action](config, services, integrations)
  }
}
```

## 4. Infrastructure Layer

### a. Integration Implementation (`/infrastructure/integrations/common/[integration]/[Integration]Integration.ts`)
Reference implementation pattern:

```1:79:src/infrastructure/integrations/common/gocardless/GoCardlessIntegration.ts
import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
} from '/domain/integrations/GoCardless'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export class GoCardlessIntegration implements IGoCardlessIntegration {
  private _instance?: AxiosInstance

  constructor(private _config?: GoCardlessConfig) {}

  getConfig = (): GoCardlessConfig => {
    if (!this._config) {
      throw new Error('GoCardless config not set')
    }
    return this._config
  }

  createPayment = async (payment: GoCardlessCreatePayment): Promise<GoCardlessPayment> => {
    const { mandate, ...rest } = payment
    const response = await this._api()
      .post('/payments', {
        payments: {
          ...rest,
          links: {
            mandate,
          },
        },
      })
      .catch((error) => {
        return error.response
      })
    if (response.status === 201) {
      return response.data.payments
    } else {
      return this._throwError(response)
    }
  }

  private _api = (): AxiosInstance => {
    if (!this._instance) {
      const config = this.getConfig()
      const headers = {
        Authorization: `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'GoCardless-Version': '2015-07-06',
      }
      switch (config.environment) {
        case 'sandbox':
          this._instance = axios.create({
            baseURL: 'https://api-sandbox.gocardless.com/',
            headers,
          })
          break
        case 'production':
          this._instance = axios.create({
            baseURL: 'https://api.gocardless.com/',
            headers,
          })
          break
      }
    }
    return this._instance
  }

  private _throwError = (response: AxiosResponse) => {
    const {
      code,
      message,
      errors: [{ field, message: detail }] = [{ field: '', message: '' }],
    } = response.data.error
    throw new Error(
      `Error "${code}" fetching data from GoCardless ${this.getConfig().environment} API: ${message}${detail ? ', ' + field + ' ' + detail : ''}`
    )
  }
}
```


### b. Integration Test Samples (`/infrastructure/integrations/bun/mocks/[integration]/[Integration]TestSamples.ts`)
```typescript
export const [integration][action]Sample: [ActionInput] = {
  // Sample data for testing
}
```

## 5. Tests

### a. Action Test (`/test/automations/actions/[integration]/[action].test.ts`)
Reference test pattern:

```1:55:test/automations/actions/qonto/createClient.test.ts
import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Qonto'] }, ({ app, request }) => {
  describe('on POST', () => {
    it('should create a client', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createClient',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-client',
              output: {
                id: '{{createClient.id}}',
              },
            },
            actions: [
              {
                name: 'createClient',
                integration: 'Qonto',
                action: 'CreateClient',
                client: {
                  name: 'John Doe',
                  type: 'company',
                  email: 'test@test.com',
                  vat_number: 'FR12345678901',
                  currency: 'EUR',
                  locale: 'FR',
                  address: '1 rue de Paris',
                  city: 'Paris',
                  zip_code: '75001',
                  country_code: 'FR',
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-client`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
```


### b. Integration Test (`/test/automations/actions/code/runTypescript/integrations/[integration].test.ts`)
Reference test pattern:

```1:62:test/automations/actions/code/runTypescript/integrations/gocardless.test.ts
import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { goCardlessCreatePaymentSample } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessTestSamples'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['GoCardless'] }, ({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with GoCardless create payment', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createPayment',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-payment',
              output: {
                payment: {
                  json: '{{runJavascriptCode.payment}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  createPayment: {
                    json: JSON.stringify(goCardlessCreatePaymentSample),
                  },
                },
                code: String(async function (
                  context: CodeRunnerContext<{
                    createPayment: typeof goCardlessCreatePaymentSample
                  }>
                ) {
                  const { gocardless } = context.integrations
                  const { createPayment } = context.inputData
                  const payment = await gocardless.createPayment(createPayment)
                  return { payment }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-payment`)

      // THEN
      expect(response.payment.id).toBeDefined()
    })
  })
})
```


### c. Integration Common Test (`/infrastructure/integrations/common/[integration]/[Integration]IntegrationTest.ts`)
```typescript
import type { I[Integration]Integration } from '/adapter/spi/integrations/[Integration]Spi'
import type BunTester from 'bun:test'
import { [integration][action]Sample } from '../../bun/mocks/[integration]/[Integration]TestSamples'

export function test[Integration]Integration(
  { describe, it, expect }: typeof BunTester,
  integration: I[Integration]Integration
) {
  describe('[actionName]', () => {
    it('should [action description]', async () => {
      // WHEN
      const result = await integration.[actionName]([integration][action]Sample)

      // THEN
      expect(result?.id).toBeDefined()
    })
  })
}
```

Remember to:
1. Update the main Action type union in `/domain/entities/Action/index.ts`
2. Add the integration type to `/infrastructure/test/bun/Helpers.ts`
3. Add the mapper to the ActionMapper switch case in `/adapter/api/mappers/Action/index.ts

## 6. Additional Integration Updates

### a. Update Action Type Union (`/domain/entities/Action/index.ts`)
```typescript
import type { [Action] } from './[integration]/[Action]'

export type Action =
  | CreateRecordDatabaseAction
  | ReadRecordDatabaseAction
  // ... existing actions ...
  | [Action] // Add new action type
```

### b. Update Integration Type (`/infrastructure/test/bun/Helpers.ts`)
```typescript
type IntegrationType =
  | 'Notion'
  | 'Qonto'
  // ... existing integrations ...
  | '[Integration]' // Add new integration type
```

### c. Update Action Mapper (`/adapter/api/mappers/Action/index.ts`)
```typescript
import { [Action]Mapper } from './[integration]/[Action]Mapper'

export class ActionMapper {
  static toEntity(
    config: IAction,
    services: ActionMapperServices,
    entities: ActionMapperEntities,
    integrations: ActionMapperIntegrations
  ): Action {
    const { action } = config
    switch (action) {
      // ... existing cases ...
      case '[Action]':
        return [Action]Mapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { [integration] }
        )
      default:
        throw new Error(`ActionMapper: Action ${action} not supported`)
    }
  }
}
```

### d. Update Integration SPI (`/adapter/spi/integrations/[Integration]Spi.ts`)
```typescript
import type { I[Integration]Integration } from './[Integration]Integration'
import type {
  [Integration]Config,
  [ActionInput],
  [ActionOutput],
} from '/domain/integrations/[Integration]'

export interface I[Integration]Spi {
  getConfig: () => [Integration]Config
  [actionName]: ([actionInput]: [ActionInput]) => Promise<[ActionOutput]>
}

export class [Integration]Spi implements I[Integration]Spi {
  constructor(private _integration: I[Integration]Integration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  [actionName] = async ([actionInput]: [ActionInput]) => {
    return this._integration.[actionName]([actionInput])
  }
}
```

### e. Update Integration Mapper (`/adapter/api/mappers/Integration/[Integration]Mapper.ts`)
```typescript
import type { Integrations } from '/adapter/spi/integrations'
import { [Integration]Spi } from '/adapter/spi/integrations/[Integration]Spi'
import { [Integration], type [Integration]Config } from '/domain/integrations/[Integration]'

export class [Integration]Mapper {
  static toIntegration(integrations: Integrations, config?: [Integration]Config): [Integration] {
    const driver = integrations.[integration](config)
    const spi = new [Integration]Spi(driver)
    return new [Integration](spi)
  }
}
```

## 7. Mock Implementation

### a. Mock Integration (`/infrastructure/integrations/bun/mocks/[integration]/[Integration]Integration.mock.ts`)
```typescript
import type { I[Integration]Integration } from '/adapter/spi/integrations/[Integration]Spi'
import type { [Integration]Config, [ActionInput], [ActionOutput] } from '/domain/integrations/[Integration]'
import { Database } from 'bun:sqlite'

export class [Integration]Integration implements I[Integration]Integration {
  private db: Database
  private _config?: [Integration]Config

  constructor(config?: [Integration]Config) {
    this._config = config
    this.db = new Database(':memory:')
    this._initDb()
  }

  private _initDb = () => {
    // Create necessary tables
    this.db.run(`
      CREATE TABLE IF NOT EXISTS [TableName] (
        id TEXT PRIMARY KEY,
        // ... other fields
        created_at TEXT
      )
    `)
  }

  getConfig = (): [Integration]Config => {
    if (!this._config) {
      throw new Error('[Integration] config not set')
    }
    return this._config
  }

  [actionName] = async ([actionInput]: [ActionInput]): Promise<[ActionOutput]> => {
    const id = `[PREFIX]${Date.now()}${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    
    // Insert into mock database
    this.db.run(
      `INSERT INTO [TableName] (
        id, // ... other fields
        created_at
      ) VALUES (?, /* other ? */, ?)`,
      [
        id,
        // ... other values
        createdAt,
      ]
    )

    // Return mock response
    return {
      id,
      created_at: createdAt,
      // ... other required fields
    }
  }
}
```

## 8. Best Practices

1. **Naming Conventions**
   - Use PascalCase for class names and interfaces
   - Use camelCase for methods and properties
   - Prefix interfaces with 'I'
   - Suffix types with meaningful descriptors (e.g., Config, Input, Output)

2. **File Organization**
   - Keep related files in the same directory
   - Use consistent file naming across the codebase
   - Group integration-specific files together

3. **Testing**
   - Write tests for both success and error cases
   - Use meaningful test descriptions
   - Follow the Given-When-Then pattern in tests
   - Use mock data that closely resembles production data

4. **Error Handling**
   - Implement proper error handling in the integration
   - Return meaningful error messages
   - Include relevant error details (status codes, error codes, etc.)

5. **Configuration**
   - Make integration configuration flexible and environment-aware
   - Use environment variables for sensitive data
   - Validate configuration on initialization

6. **Documentation**
   - Add JSDoc comments for public methods
   - Document expected input/output formats
   - Include usage examples in comments
   - Document any special requirements or limitations

This template provides a foundation for adding new integration actions to the system while maintaining consistency with the existing codebase structure and patterns.
