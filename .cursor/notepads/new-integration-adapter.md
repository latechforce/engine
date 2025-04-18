# Creating New Integrations Tutorial

Important: don't integrate any specifics endpoints for each file of the new integration.

## Inputs:

- [Nom]: Name of the integration, replace `NewIntegration` by the name of the integration

## Step 1: Adapter Integration SPI

Create a new file in `src/adapter/spi/integrations/NewIntegrationSpi.ts` to implement the adapter layer:

```typescript
import { BaseSpi } from './base'
import type { INewIntegrationSpi } from '/domain/integrations/NewIntegration/INewIntegrationSpi'

export type INewIntegrationIntegration = INewIntegrationSpi

// Just duplicate the template without filling it
export class NewIntegrationSpi
  extends BaseSpi<NewIntegrationConfig, INewIntegrationIntegration>
  implements INewIntegrationSpi
{
  constructor(integration: INewIntegrationIntegration) {
    super(integration)
  }
}
```

## Step 2: Adapter Integration Index

Update the `src/adapter/spi/integrations/index.ts` file to add the new integration to the integrations SPI index:

```typescript
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration/NewIntegrationConfig'
import type { INewIntegrationIntegration } from './NewIntegrationSpi'

export interface Integrations {
  newIntegration: (config: NewIntegrationConfig) => INewIntegrationIntegration
}
```

## Step 3: Adapter Integration Schema

Create a new file in `src/adapter/api/schemas/IntegrationSchema/NewIntegrationSchema.ts` to add the new integration to the integration schema:

```typescript
import type { NewIntegrationConfig } from '/domain/integrations/NewIntegration'

/**
 * NewIntegration configuration schema
 * @title NewIntegration
 * @description A configuration schema for NewIntegration integration
 */
export type NewIntegrationIntegrationSchema = NewIntegrationConfig
```

## Step 4: Adapter Integration Mapper

Create a new file in `src/adapter/api/mappers/Integration/NewIntegrationMapper.ts` to create the integration mapper:

```typescript
import type { Integrations } from '/adapter/spi/integrations'
import { NewIntegrationSpi } from '/adapter/spi/integrations/NewIntegrationSpi'
import { NewIntegration } from '/domain/integrations/NewIntegration'
import type { NewIntegrationIntegrationSchema } from '../../schemas/IntegrationSchema/NewIntegrationSchema'

export class NewIntegrationMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: NewIntegrationIntegrationSchema[] = []
  ): NewIntegration[] {
    const spis = schemas.map((schema) => {
      const driver = integrations.newIntegration(schema)
      return new NewIntegrationSpi(driver)
    })
    return new NewIntegration(spis)
  }
}
```
