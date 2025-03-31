import { CalendlyIntegration } from './CalendlyIntegration.mock'
import { testCalendlyIntegration } from '/infrastructure/integrations/common/calendly/CalendlyIntegrationTest'
import BunTester from 'bun:test'

export const integration = new CalendlyIntegration({
  accessToken: ':memory:',
})

testCalendlyIntegration(BunTester, integration)
