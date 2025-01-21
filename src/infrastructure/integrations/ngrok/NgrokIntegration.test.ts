import { NgrokIntegration } from '@infrastructure/integrations/ngrok/NgrokIntegration'
import { testNgrokIntegration } from './NgrokIntegrationTest'
import env from '@test/env'

const integration = new NgrokIntegration({
  authToken: env.TEST_NGROK_AUTH_TOKEN,
})

testNgrokIntegration(integration)
