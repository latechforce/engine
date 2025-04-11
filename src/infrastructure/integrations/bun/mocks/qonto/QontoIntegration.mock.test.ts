import { testQontoIntegration } from '/infrastructure/integrations/common/qonto/QontoIntegrationTest'
import { QontoIntegration } from './QontoIntegration.mock'
import BunTester from 'bun:test'

const integration = new QontoIntegration({
  name: 'test',
  baseUrl: ':memory:',
  stagingToken: 'test',
  organisationSlug: 'test',
  secretKey: 'test',
})

await integration.createToken('test')

testQontoIntegration(BunTester, integration)
