# Integration Implementation Template

Legend:

- `NewIntegration` is the name of the integration and should be replaced by the actual name of the integration (e.g. `Qonto`) in the codebase.

## 1. Domain Layer

### a. Domain Interface (`/domain/integrations/NewIntegration.ts`)

```typescript
export interface NewIntegrationSandboxConfig {
  environment: 'sandbox'
  accessToken: string
}

export interface NewIntegrationProductionConfig {
  environment: 'production'
  accessToken: string
}

export type NewIntegrationConfig = NewIntegrationSandboxConfig | NewIntegrationProductionConfig

export interface INewIntegrationSpi {
  getConfig: () => NewIntegrationConfig
  newApiMethod: (data: NewApiMethodInput) => Promise<NewApiMethodOutput>
}

export class NewIntegration {
  constructor(private _spi: INewIntegrationSpi) {}

  getConfig = (): NewIntegrationConfig => {
    return this._spi.getConfig()
  }

  newApiMethod = async (data: NewApiMethodInput): Promise<NewApiMethodOutput> => {
    return this._spi.newApiMethod(data)
  }
}

// Define your API method interfaces
export interface NewApiMethodInput {
  // Input properties
}

export interface NewApiMethodOutput {
  // Output properties
}
```

### b. Update Domain Interfaces (`/domain/interfaces/IIntegrations.ts`)

Reference for pattern:

```1:15:src/domain/interfaces/IIntegrations.ts
import type { GoogleMailConfig } from '../integrations/Google/GoogleMail'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'

export interface IIntegrations {
  airtable?: AirtableConfig
  notion?: NotionConfig
  pappers?: PappersConfig
  qonto?: QontoConfig
  google?: {
    mail?: GoogleMailConfig
  }
}
```

## 2. Adapter Layer

### a. SPI Interface (`/adapter/spi/integrations/NewIntegrationSpi.ts`)

```typescript
import type {
  INewIntegrationSpi,
  NewIntegrationConfig,
  NewApiMethodInput,
  NewApiMethodOutput,
} from '/domain/integrations/NewIntegration'

export interface INewIntegrationIntegration {
  getConfig: () => NewIntegrationConfig
  newApiMethod: (data: NewApiMethodInput) => Promise<NewApiMethodOutput>
}

export class NewIntegrationSpi implements INewIntegrationSpi {
  constructor(private _integration: INewIntegrationIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  newApiMethod = async (data: NewApiMethodInput) => {
    return this._integration.newApiMethod(data)
  }
}
```

## 3. Infrastructure Layer

### a. Main Integration Implementation (`/infrastructure/integrations/common/newintegration/NewIntegrationIntegration.ts`)

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type {
  NewApiMethodInput,
  NewApiMethodOutput,
  NewIntegrationConfig,
} from '/domain/integrations/NewIntegration'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export class NewIntegrationIntegration implements INewIntegrationIntegration {
  private _instance?: AxiosInstance

  constructor(private _config?: NewIntegrationConfig) {}

  getConfig = (): NewIntegrationConfig => {
    if (!this._config) {
      throw new Error('NewIntegration config not set')
    }
    return this._config
  }

  newApiMethod = async (data: NewApiMethodInput): Promise<NewApiMethodOutput> => {
    const response = await this._api()
      .post('/endpoint', data)
      .catch((error) => {
        return error.response
      })
    if (response.status === 201) {
      return response.data
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
      }
      switch (config.environment) {
        case 'sandbox':
          this._instance = axios.create({
            baseURL: 'https://api-sandbox.newintegration.com/',
            headers,
          })
          break
        case 'production':
          this._instance = axios.create({
            baseURL: 'https://api.newintegration.com/',
            headers,
          })
          break
      }
    }
    return this._instance
  }

  private _throwError = (response: AxiosResponse) => {
    const { code, message, detail } = response.data.error
    throw new Error(
      `Error "${code}" fetching data from NewIntegration ${this.getConfig().environment} API: ${message}${detail ? ', ' + detail : ''}`
    )
  }
}
```

### b. Mock Implementation (`/infrastructure/integrations/bun/mocks/newintegration/NewIntegrationIntegration.mock.ts`)

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type {
  NewApiMethodInput,
  NewApiMethodOutput,
  NewIntegrationConfig,
} from '/domain/integrations/NewIntegration'
import { Database } from 'bun:sqlite'

export class NewIntegrationIntegration implements INewIntegrationIntegration {
  private db: Database

  constructor(private _config?: NewIntegrationConfig) {
    this.db = new Database(_config?.accessToken ?? ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS ApiMethodTable (
        id TEXT PRIMARY KEY,
        // Add your table columns
      )
    `)
  }

  getConfig = (): NewIntegrationConfig => {
    if (!this._config) {
      throw new Error('NewIntegration config not set')
    }
    return this._config
  }

  newApiMethod = async (data: NewApiMethodInput): Promise<NewApiMethodOutput> => {
    // Implement mock logic
  }
}
```

### c. Test Samples (`/infrastructure/integrations/bun/mocks/newintegration/NewIntegrationTestSamples.ts`)

```typescript
import type { NewApiMethodInput } from '/domain/integrations/NewIntegration'

export const newApiMethodSample: NewApiMethodInput = {
  // Add sample data
}
```

### d. Integration Tests (`/infrastructure/integrations/common/newintegration/NewIntegrationTest.ts`)

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type BunTester from 'bun:test'

export function testNewIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: INewIntegrationIntegration
) {
  describe('newApiMethod', () => {
    it('should execute the API method', async () => {
      // Add your test
    })
  })
}
```

### e. Update Integration Registry (`/infrastructure/integrations/common/index.ts`)

Reference for pattern:

```1:23:src/infrastructure/integrations/common/index.ts
import type { Integrations } from '/adapter/spi/integrations'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { PappersConfig } from '/domain/integrations/Pappers'
import type { QontoConfig } from '/domain/integrations/Qonto'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import type { AirtableConfig } from '/domain/integrations/Airtable'
import type { GoogleMailConfig } from '/domain/integrations/Google/GoogleMail'
import type { GoCardlessConfig } from '/domain/integrations/GoCardless'

import { NotionIntegration } from './notion/NotionIntegration'
import { PappersIntegration } from './pappers/PappersIntegration'
import { QontoIntegration } from './qonto/QontoIntegration'
import { NgrokIntegration } from './ngrok/NgrokIntegration'
import { AirtableIntegration } from './airtable/AirtableIntegration'
import { GoogleMailIntegration } from './google/mail/GoogleMailIntegration'
import { GoCardlessIntegration } from './gocardless/GoCardlessIntegration'

export const integrations: Integrations = {
  airtable: (config?: AirtableConfig) => new AirtableIntegration(config),
  notion: (config?: NotionConfig) => new NotionIntegration(config),
  pappers: (config?: PappersConfig) => new PappersIntegration(config),
  qonto: (config?: QontoConfig) => new QontoIntegration(config),

```

## 4. Testing

### a. Integration Test Implementation (`/infrastructure/integrations/common/newintegration/NewIntegrationIntegration.test.ts`)

```typescript
import { NewIntegrationIntegration } from './NewIntegrationIntegration'
import { testNewIntegration } from './NewIntegrationTest'
import env from '../../../test/env'
import BunTester from 'bun:test'

const { TEST_NEW_INTEGRATION_ACCESS_TOKEN } = env

export const integration = new NewIntegrationIntegration({
  environment: 'sandbox',
  accessToken: TEST_NEW_INTEGRATION_ACCESS_TOKEN,
})

testNewIntegration(BunTester, integration)
```

This template follows the clean architecture pattern seen in the codebase and provides a structured approach to adding new integrations. Each new integration should implement these core components while adapting the specific API requirements and business logic needed.
