import { JotformIntegration } from './JotformIntegration.mock'
import { testJotformIntegration } from '/infrastructure/integrations/common/jotform/JotformIntegrationTest'
import BunTester from 'bun:test'

export const integration = new JotformIntegration({
  name: 'test',
  baseUrl: ':memory:',
  apiKey: 'test',
})

await integration.createToken('test')

testJotformIntegration(BunTester, integration)
