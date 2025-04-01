import { CalendlyIntegration } from './CalendlyIntegration'
import { testCalendlyIntegration } from './CalendlyIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_CALENDLY_USER_ACCESS_TOKEN, TEST_CALENDLY_CLIENT_ID, TEST_CALENDLY_CLIENT_SECRET } =
  env

export const integration = new CalendlyIntegration({
  user: {
    accessToken: TEST_CALENDLY_USER_ACCESS_TOKEN,
  },
  client: {
    id: TEST_CALENDLY_CLIENT_ID,
    secret: TEST_CALENDLY_CLIENT_SECRET,
  },
})

testCalendlyIntegration(BunTester, integration)
