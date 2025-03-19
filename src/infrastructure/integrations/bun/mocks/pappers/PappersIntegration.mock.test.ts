import { PappersIntegration } from './PappersIntegration.mock'
import { pappersCompanySample } from './PappersTestSamples'
import { testPappersIntegration } from '/infrastructure/integrations/common/pappers/PappersIntegrationTest'
import BunTester from 'bun:test'

const integration = new PappersIntegration({
  apiKey: ':memory:',
})

await integration.createUser(':memory:')
await integration.addCompany(pappersCompanySample)

testPappersIntegration(BunTester, integration)
