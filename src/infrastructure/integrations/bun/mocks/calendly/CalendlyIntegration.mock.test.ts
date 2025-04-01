import { CalendlyIntegration } from './CalendlyIntegration.mock'
import { testCalendlyIntegration } from '/infrastructure/integrations/common/calendly/CalendlyIntegrationTest'
import BunTester from 'bun:test'

export const integration = new CalendlyIntegration({
  user: {
    accessToken: ':memory:',
  },
  client: {
    id: ':memory:',
    secret: ':memory:',
  },
})

testCalendlyIntegration(BunTester, integration)
