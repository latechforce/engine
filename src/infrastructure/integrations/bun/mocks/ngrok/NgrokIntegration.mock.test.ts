import { testNgrokIntegration } from '/infrastructure/integrations/common/ngrok/NgrokIntegrationTest'
import { NgrokIntegration } from './NgrokIntegration.mock'
import BunTester from 'bun:test'

const integration = new NgrokIntegration({
  account: 'test',
  baseUrl: ':memory:',
  authToken: 'test',
})

await integration.createToken('test')

testNgrokIntegration(BunTester, integration)
