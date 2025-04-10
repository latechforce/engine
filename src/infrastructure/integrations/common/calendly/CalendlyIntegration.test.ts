import { CalendlyIntegration } from './CalendlyIntegration'
import { testCalendlyIntegration } from './CalendlyIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_CALENDLY_BASE_URL, TEST_CALENDLY_USER_ACCESS_TOKEN } = env

export const integration = new CalendlyIntegration({
  name: 'test',
  baseUrl: TEST_CALENDLY_BASE_URL,
  user: {
    accessToken: TEST_CALENDLY_USER_ACCESS_TOKEN,
  },
})

testCalendlyIntegration(BunTester, integration)
