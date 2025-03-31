# Creating New Integrations Tutorial

Important: don't integrate any specifics endpoints for each file of the new integration.

## Inputs:

- [Nom]: Name of the integration, replace `NewIntegration` by the name of the integration
- [OpenAPI]: Optional, OpenAPI definition of the integration, with API endpoints and methods
- [NPMPackage]: Optional, NPM package of the integration

## Step 1: Infrastructure Common Integration

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
     // Replace with the error type of the integration
    const {  } = error
    return {
      // Replace with the error type of the integration
      error: {  },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Replace with the most basic method of the integration, only to check the authentication
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
      // Replace with the authentication method of the integration following the OpenAPI definition
      Authorization: `${config?.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      // Replace with the base URL of the integration following the OpenAPI definition
      baseURL: 'https://newIntegration.com/api',
      headers,
    })
  }

  private _errorMapper = (
    response: AxiosResponse<{ errors: NewIntegrationError[] }>
  ): IntegrationResponseError => {
    // Replace with the error type of the integration
    const [{  }] = response.data.errors
    return {
      // Replace with the error type of the integration
      error: {  },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Replace with the most basic method of the integration, only to check the authentication
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
