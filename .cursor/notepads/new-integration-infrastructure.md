# Creating New Integrations Tutorial

Important: don't integrate any specifics endpoints for each file of the new integration.

## Inputs:

- [Nom]: Name of the integration, replace `NewIntegration` by the name of the integration
- [OpenAPI]: Optional, OpenAPI definition of the integration, with API endpoints and methods
- [NPMPackage]: Optional, NPM package of the integration
- [NewIntegrationTypes]: Integration file types where there is the error
- [NewIntegrationConfig]: Integration file config where there is the auth keys / tokens

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

  constructor(public config: NewIntegrationConfig) {
    // Reuse the configuration keys in the /domain/integrations/NewIntegration/NewIntegrationConfig.ts
    this._newIntegration = new NewIntegration(this.config)
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof NewIntegrationError) {
      // Replace with the error type of the integration in the /domain/integrations/NewIntegration/NewIntegrationTypes.ts
      const {} = error
      return {
        // Map the NewIntegrationError with the IntegrationResponseError of the /domain/integration/base.ts file
        error: {},
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Replace with the most basic method of the integration, only to check the authentication
      await this._newIntegration.get('/user')
    } catch (error) {
      return this._responseError(error)
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
import { join } from 'path'

export class NewIntegrationIntegration implements INewIntegrationIntegration {
  private _instance: AxiosInstance

  constructor(public config: NewIntegrationConfig) {
    const { baseUrl = 'https://api.newIntegration.com', apiKey } = config
    const headers = {
      // Fill with the authentication method of the integration following the OpenAPI definition
      // Reuse the configuration keys in the /domain/integrations/NewIntegration/NewIntegrationConfig.ts
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: join(baseUrl, 'v1'),
      headers,
    })
  }

  // Don't change the methods parameters

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      // Replace with the error type of the integration in the /domain/integrations/NewIntegration/NewIntegrationTypes.ts
      const [{}] = error.response.data.errors
      return {
        // Map the NewIntegrationError with the IntegrationResponseError of the /domain/integration/base.ts file
        error: {},
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Replace with the most basic and costless method of the integration, only to check the authentication
      await this._instance.get('/user')
    } catch (error) {
      return this._responseError(error)
    }
  }
}
```

## Step 2: Infrastructure Common Integration Index

Update the `src/infrastructure/integrations/common/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { NewIntegrationIntegration } from './newIntegration/NewIntegrationIntegration'

export const integrations: Integrations = {
  newIntegration: (config: NewIntegrationConfig) => new NewIntegrationIntegration(config),
}
```

## Step 3: Infrastructure Bun Integration

Create a new file in `src/infrastructure/integrations/bun/mocks/newIntegration/NewIntegrationIntegration.mock.ts` to create the integration mock:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import { BaseMockIntegration } from '../base'

export class NewIntegrationIntegration
  extends BaseMockIntegration
  implements INewIntegrationIntegration
{
  constructor(public config: NewIntegrationConfig) {
    super(config, config.apiKey)
  }
}
```

## Step 4: Infrastructure Integration Bun Index

Update the `src/infrastructure/integrations/bun/mocks/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { NewIntegrationIntegration } from './newIntegration/NewIntegrationIntegration.mock'

export const mocks: Integrations = {
  newIntegration: (config: NewIntegrationConfig) => new NewIntegrationIntegration(config),
}
```
