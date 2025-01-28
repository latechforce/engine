import { testNgrokIntegration } from '/infrastructure/integrations/common/ngrok/NgrokIntegrationTest'
import { NgrokIntegration } from './NgrokIntegration.mock'
import BunTester from 'bun:test'

const integration = new NgrokIntegration({
  authToken: 'test',
})

testNgrokIntegration(BunTester, integration)
