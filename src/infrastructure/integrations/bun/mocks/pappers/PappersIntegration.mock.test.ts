import { PappersIntegration, sampleCompany } from './PappersIntegration.mock'
import { testPappersIntegration } from '@infrastructure/integrations/common/pappers/PappersIntegrationTest'
import BunTester from 'bun:test'

const integration = new PappersIntegration({
  apiKey: ':memory:',
})

await integration.addCompany(sampleCompany)

testPappersIntegration(BunTester, integration)
