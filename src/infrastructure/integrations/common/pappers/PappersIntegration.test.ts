import { PappersIntegration } from '@infrastructure/integrations/common/pappers/PappersIntegration'
import { testPappersIntegration } from '@infrastructure/integrations/common/pappers/PappersIntegrationTest'
import env from '@test/env'
import BunTester from 'bun:test'

const { TEST_PAPPERS_API_KEY } = env

export const integration = new PappersIntegration({
  apiKey: TEST_PAPPERS_API_KEY,
})

testPappersIntegration(BunTester, integration)
