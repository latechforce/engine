import { CalendlyIntegration } from './CalendlyIntegration'
import { testCalendlyIntegration } from './CalendlyIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_CALENDLY_ACCESS_TOKEN } = env

export const integration = new CalendlyIntegration({
  accessToken: TEST_CALENDLY_ACCESS_TOKEN,
})

testCalendlyIntegration(BunTester, integration)
