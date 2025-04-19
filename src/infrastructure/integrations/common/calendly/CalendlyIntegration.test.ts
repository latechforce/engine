import { CalendlyIntegration } from './CalendlyIntegration'
import { testCalendlyIntegration } from './CalendlyIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_CALENDLY_BASE_URL, TEST_CALENDLY_ACCESS_TOKEN } = env

export const integration = new CalendlyIntegration({
  account: 'test',
  baseUrl: TEST_CALENDLY_BASE_URL,
  accessToken: TEST_CALENDLY_ACCESS_TOKEN,
})

testCalendlyIntegration(BunTester, integration)
