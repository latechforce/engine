import { PappersIntegration } from '@infrastructure/integrations/pappers/PappersIntegration'
import { testPappersIntegration } from '@infrastructure/integrations/pappers/PappersIntegrationTest'
import env from '@test/env'

const { TEST_PAPPERS_API_KEY } = env

export const integration = new PappersIntegration({
  apiKey: TEST_PAPPERS_API_KEY,
})

testPappersIntegration(integration)
