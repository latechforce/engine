import { testQontoIntegration } from '@infrastructure/integrations/pappers/QontoIntegrationTest'
import { QontoIntegration } from './QontoIntegration.mock'

const integration = new QontoIntegration({
  environment: 'sandbox',
  stagingToken: 'test',
  organisationSlug: 'test',
  secretKey: 'test',
})

testQontoIntegration(integration)
