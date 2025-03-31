# Creating New Integrations Tutorial

Important: don't integrate any specifics endpoints for each file of the new integration.

## Inputs:

- [Nom]: Name of the integration, replace `NewIntegration` by the name of the integration
- [NewIntegrationConfig]: Integration file config where there is the auth keys / tokens

## Step 1: Infrastructure Common Integration Test

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegrationTest.ts` to create the integration test:

```typescript
import type { INewIntegrationIntegration } from '/adapter/spi/integrations/NewIntegrationSpi'
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

## Step 2: Infrastructure Test Env

Update the file `src/infrastructure/test/env.ts` to add the environment variables of the integration:

```typescript
const {
  // ...keep the other env vars
  TEST_NEW_INTEGRATION_API_KEY,
} = process.env

// Add the new env var
if (!TEST_NEW_INTEGRATION_API_KEY)
  throw new Error('TEST_NEW_INTEGRATION_API_KEY env var is not defined')

const env = {
  // ...keep the other env vars
  TEST_NEW_INTEGRATION_API_KEY,
}
```

## Step 3: Infrastructure Common Integration Test Runner

Create a new file in `src/infrastructure/integrations/common/newIntegration/NewIntegrationIntegration.test.ts` to create the integration test common:

```typescript
import { NewIntegrationIntegration } from './NewIntegrationIntegration'
import { testNewIntegrationIntegration } from './NewIntegrationIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

// Replace with the environment variables of the integration in the /infrastructure/test/env.ts file
const { TEST_NEW_INTEGRATION_API_KEY } = env

export const integration = new NewIntegrationIntegration({
  // Replace with the configuration keys of the integration in the /domain/integrations/NewIntegration/NewIntegrationConfig.ts
  apiKey: TEST_NEW_INTEGRATION_API_KEY,
})

testNewIntegrationIntegration(BunTester, integration)
```

## Step 4: Infrastructure Bun Integration Test

Create a new file in `src/infrastructure/integrations/bun/mocks/newIntegration/NewIntegrationIntegration.test.ts` to create the integration test:

```typescript
import { NewIntegrationIntegration } from './NewIntegrationIntegration.mock'
import { testNewIntegrationIntegration } from '/infrastructure/integrations/common/newIntegration/NewIntegrationIntegrationTest'
import BunTester from 'bun:test'

export const integration = new NewIntegrationIntegration({
  // Replace with the configuration keys of the integration in the /domain/integrations/NewIntegration/NewIntegrationConfig.ts
  apiKey: ':memory:',
})

testNewIntegrationIntegration(BunTester, integration)
```
