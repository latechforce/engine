import { PappersIntegration } from './PappersIntegration.mock'
import { pappersCompanySample } from './PappersTestSamples'
import { testPappersIntegration } from '/infrastructure/integrations/common/pappers/PappersIntegrationTest'
import BunTester from 'bun:test'

const integration = new PappersIntegration({
  apiKey: 'test',
  baseUrl: ':memory:',
  account: 'pappers',
})

await integration.createToken('test')
await integration.addCompany(pappersCompanySample)

testPappersIntegration(BunTester, integration)
