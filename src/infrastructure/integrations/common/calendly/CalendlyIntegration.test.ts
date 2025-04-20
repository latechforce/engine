import { CalendlyIntegration } from './CalendlyIntegration'
import { testCalendlyIntegration } from './CalendlyIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const {
  TEST_CALENDLY_BASE_URL,
  TEST_CALENDLY_ACCESS_TOKEN,
  TEST_CALENDLY_CLIENT_ID,
  TEST_CALENDLY_CLIENT_SECRET,
  TEST_CALENDLY_AUTH_BASE_URL,
} = env

export const integration = new CalendlyIntegration({
  account: 'test',
  baseUrl: TEST_CALENDLY_BASE_URL,
  accessToken: TEST_CALENDLY_ACCESS_TOKEN,
  clientId: TEST_CALENDLY_CLIENT_ID,
  clientSecret: TEST_CALENDLY_CLIENT_SECRET,
  authBaseUrl: TEST_CALENDLY_AUTH_BASE_URL,
})

testCalendlyIntegration(BunTester, integration)
