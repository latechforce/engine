import { testNgrokIntegration } from '@infrastructure/integrations/ngrok/NgrokIntegrationTest'
import { NgrokIntegration } from './NgrokIntegration.mock'

const integration = new NgrokIntegration({
  authToken: 'test',
})

testNgrokIntegration(integration)
