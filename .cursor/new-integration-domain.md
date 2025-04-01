# Creating New Integrations Tutorial

Important: don't integrate any specifics endpoints for each file of the new integration.

## Inputs:

- [Nom]: Name of the integration, replace `NewIntegration` by the name of the integration
- [OpenAPI]: Optional, OpenAPI definition of the integration, with API endpoints and methods

## Step 1: Domain Integration Configuration

First, let's create the configuration types for your integration. Create a new file in `src/domain/integrations/NewIntegration/NewIntegrationConfig.ts`:

```typescript
export type NewIntegrationConfig = {
  // Fill with the integration-specific authentification fields of the OpenAPI definition
}
```

## Step 2: Domain Integration Types

Now, let's create the types for your integration. Create a new file in `src/domain/integrations/NewIntegration/NewIntegrationTypes.ts`:

```typescript
export interface NewIntegrationError {
  // Fill with with the error type return by the methods of the OpenAPI definition
}

// Don't add any other types
```

## Step 3: Domain Integration SPI

Create a new file in `src/domain/integrations/NewIntegration/INewIntegrationSpi.ts` to define the domain interface for your integration:

```typescript
import type { BaseSpi } from '../base'

// Just duplicate the template without filling it
export interface INewIntegrationSpi extends BaseSpi {}
```

## Step 4: Domain Integration

Create a new file in `src/domain/integrations/NewIntegration/index.ts` to implement the integration:

```typescript
import type { INewIntegrationSpi } from './INewIntegrationSpi'
import { Integration } from '../base'

// Just duplicate the template without filling it
export class NewIntegration extends Integration<INewIntegrationSpi> {
  constructor(spi: INewIntegrationSpi) {
    super(spi)
  }
}
```
