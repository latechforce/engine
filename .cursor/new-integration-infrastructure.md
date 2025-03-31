# Creating New Integrations Tutorial

This tutorial will guide you through creating a new integration in the codebas. We'll break this down into multiple steps and files.

Here we only want to add the integration to the codebase, not to add the integration methods and actions.

## Step 1: Domain Integration Configuration

First, let's create the configuration types for your integration. Create a new file in `src/domain/integrations/NewIntegration/NewIntegrationConfig.ts`:

```typescript
export type NewIntegrationConfig = {
  // Add your production-specific configuration fields
  apiKey: string
}
```

### Key Points:

- Keep sensitive information like API keys in the configuration
- Make all configuration fields required unless optional

## Step 2: Domain Integration Types

Now, let's create the types for your integration. Create a new file in `src/domain/integrations/NewIntegration/NewIntegrationTypes.ts`:

```typescript
// Example of error type for API responses
export interface NewIntegrationError {
  status: number
  code: string
  detail: string
}

// Example of a resource type
export interface NewIntegrationResource {
  id: string
  name: string
  created_at: string
  // Add other resource-specific fields
}

// Example of a create resource request type
export interface NewIntegrationCreateResource {
  name: string
  // Add other required fields for creation
}
```

## Step 3: Domain Integration SPI

Create a new file in `src/domain/integrations/NewIntegration/INewIntegrationSpi.ts` to define the domain interface for your integration:

```typescript
import type { BaseSpi } from '../base'

export interface INewIntegrationSpi extends BaseSpi {
  // Add your integration-specific methods here
}
```

## Step 4: Domain Integration

Create a new file in `src/domain/integrations/NewIntegration/index.ts` to implement the integration:

```typescript
import type { INewIntegrationSpi } from './INewIntegrationSpi'
import { Integration } from '../base'

export class NewIntegration extends Integration<INewIntegrationSpi> {
  constructor(spi: INewIntegrationSpi) {
    super(spi)
  }
}
```

## Step 5: Adapter Integration SPI

Create a new file in `src/adapter/spi/integrations/NewIntegrationSpi.ts` to implement the adapter layer:

```typescript
import { BaseSpi } from './base'
import type { INewIntegrationSpi } from '/domain/integrations/NewIntegration/INewIntegrationSpi'

export type INewIntegrationIntegration = INewIntegrationSpi

export class NewIntegrationSpi
  extends BaseSpi<INewIntegrationIntegration>
  implements INewIntegrationSpi
{
  constructor(integration: INewIntegrationIntegration) {
    super(integration)
  }
}
```

## Step 6: Adapter Integration Index

Update the `src/adapter/spi/integrations/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { INewIntegrationIntegration } from './NewIntegrationSpi'

export interface Integrations {
  newIntegration: (config?: NewIntegrationConfig) => INewIntegrationIntegration
}
```

## Step 7: Adapter Integration Mapper

Create a new file in `src/adapter/api/mappers/Integration/NewIntegrationMapper.ts` to create the integration mapper:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import { NewIntegrationSpi } from '/adapter/spi/integrations/NewIntegrationSpi'
import { NewIntegration } from '/domain/integrations/NewIntegration'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'

export class NewIntegrationMapper {
  static toIntegration(integrations: Integrations, config?: NewIntegrationConfig): NewIntegration {
    const driver = integrations.newIntegration(config)
    const spi = new NewIntegrationSpi(driver)
    return new NewIntegration(spi)
  }
}
```

## Step 8: Infrastructure Common Integration

### With NPM Package (if available)

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegration.ts` to create the integration integration:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
// To be replaced with the actual NPM package corresponding to the integration
import { NewIntegration, type NewIntegrationError } from 'newintegration'

export class NewIntegrationIntegration implements INotionIntegration {
  private _newIntegration: NewIntegration

  constructor(private _config?: NewIntegrationConfig) {
    this._newIntegration = new NewIntegration(this._config)
  }

  private _errorMapper = (error: NewIntegrationError): IntegrationResponseError => {
    const { status, code, detail } = error
    return {
      error: { status, code, detail },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._newIntegration.get('/user')
    } catch (error) {
      if (error instanceof NewIntegrationError) {
        return this._errorMapper(error)
      }
      throw error
    }
  }
}
```

### With Axios (if NPM package is not available)

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegration.ts` to create the integration integration:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class NewIntegrationIntegration implements INewIntegrationIntegration {
  private _instance: AxiosInstance

  constructor(config?: NewIntegrationConfig) {
    const headers = {
      Authorization: `${config?.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: 'https://newIntegration.com/api',
      headers,
    })
  }

  private _errorMapper = (
    response: AxiosResponse<{ errors: NewIntegrationError[] }>
  ): IntegrationResponseError => {
    const [{ status, code, detail }] = response.data.errors
    return {
      error: { status, code, detail },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/user')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
```

## Step 9: Infrastructure Common Integration Test

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegrationTest.ts` to create the integration test:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type BunTester from 'bun:test'

export function testNewIntegrationIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: INewIntegrationIntegration
) {
  describe('NewIntegrationIntegration', () => {
    it('should be able to check configuration', async () => {
      // WHEN
      const result = await integration.checkConfiguration()

      // THEN
      expect(result).toBeUndefined()
    })
  })
}
```

## Step 10: Infrastructure Common Integration Test Runner

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegration.test.ts` to create the integration test common:

```typescript
import { NewIntegrationIntegration } from './NewIntegrationIntegration'
import { testNewIntegrationIntegration } from './NewIntegrationIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_NEW_INTEGRATION_API_KEY } = env

export const integration = new NewIntegrationIntegration({
  apiKey: TEST_NEW_INTEGRATION_API_KEY,
})

testNewIntegrationIntegration(BunTester, integration)
```

## Step 13: Infrastructure Common Integration Index

Update the `src/infrastructure/integrations/bun/mocks/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { INewIntegrationIntegration } from './newIntegration/NewIntegrationIntegration'

export const integrations: Integrations = {
  newIntegration: (config?: NewIntegrationConfig) => INewIntegrationIntegration,
}
```

## Step 11: Infrastructure Bun Integration

Create a new file in `src/infrastructure/integrations/bun/mocks/newIntegration/NewIntegrationIntegration.mock.ts` to create the integration mock:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import { Database } from 'bun:sqlite'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'

export class NewIntegrationIntegration implements INewIntegrationIntegration {
  private db: Database

  constructor(private _config?: NewIntegrationConfig) {
    this.db = new Database(_config?.apiKey ?? ':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS Users (apiKey TEXT PRIMARY KEY)`)
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db
      .query<NewIntegrationConfig, string>('SELECT * FROM Users WHERE apiKey = ?')
      .get(this._config?.apiKey ?? '')
    if (!user) {
      return { error: { status: 404, code: 'not_found', detail: 'User not found' } }
    }
    return undefined
  }
}
```

## Step 12: Infrastructure Bun Integration Test

Create a new file in `src/infrastructure/integrations/bun/mocks/newIntegration/NewIntegrationIntegration.test.ts` to create the integration test:

```typescript
import { NewIntegrationIntegration } from './NewIntegrationIntegration'
import { testNewIntegrationIntegration } from './NewIntegrationIntegrationTest'
import BunTester from 'bun:test'

export const integration = new NewIntegrationIntegration({
  apiKey: ':memory:',
})

testNewIntegrationIntegration(BunTester, integration)
```

## Step 13: Infrastructure Integration Bun Index

Update the `src/infrastructure/integrations/bun/mocks/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { INewIntegrationIntegration } from './newIntegration/NewIntegrationIntegration.mock'

export const mocks: Integrations = {
  newIntegration: (config?: NewIntegrationConfig) => INewIntegrationIntegration,
}
```
