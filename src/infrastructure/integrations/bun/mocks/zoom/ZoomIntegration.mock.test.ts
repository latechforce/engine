import { ZoomIntegration } from './ZoomIntegration.mock'
import { testZoomIntegration } from '/infrastructure/integrations/common/zoom/ZoomIntegrationTest'
import BunTester from 'bun:test'

export const integration = new ZoomIntegration({
  account: 'test',
  baseUrl: ':memory:',
  clientId: 'test',
  clientSecret: 'test',
  authBaseUrl: ':memory:',
})

await integration.createToken('test')

testZoomIntegration(BunTester, integration)
