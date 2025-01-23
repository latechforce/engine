import { NgrokIntegration } from '@infrastructure/integrations/common/ngrok/NgrokIntegration'
import { testNgrokIntegration } from './NgrokIntegrationTest'
import env from '@test/env'
import BunTester from 'bun:test'

const integration = new NgrokIntegration({
  authToken: env.TEST_NGROK_AUTH_TOKEN,
})

testNgrokIntegration(BunTester, integration)
