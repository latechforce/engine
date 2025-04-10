import { testGoCardlessIntegration } from '/infrastructure/integrations/common/gocardless/GoCardlessIntegrationTest'
import { GoCardlessIntegration } from './GoCardlessIntegration.mock'
import BunTester from 'bun:test'

const integration = new GoCardlessIntegration({
  name: 'test',
  baseUrl: ':memory:',
  accessToken: 'test',
})

testGoCardlessIntegration(BunTester, integration)
