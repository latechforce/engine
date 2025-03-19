import { testQontoIntegration } from '/infrastructure/integrations/common/qonto/QontoIntegrationTest'
import { QontoIntegration } from './QontoIntegration.mock'
import BunTester from 'bun:test'

const integration = new QontoIntegration({
  environment: 'sandbox',
  stagingToken: 'test',
  organisationSlug: 'test',
  secretKey: ':memory:',
})

await integration.createOrganization('test', 'test')

testQontoIntegration(BunTester, integration)
