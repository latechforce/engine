import { GoCardlessIntegration } from './GoCardlessIntegration'
import { testGoCardlessIntegration } from './GoCardlessIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_GOCARDLESS_ACCESS_TOKEN, TEST_GOCARDLESS_BASE_URL } = env

export const integration = new GoCardlessIntegration({
  name: 'test',
  baseUrl: TEST_GOCARDLESS_BASE_URL,
  accessToken: TEST_GOCARDLESS_ACCESS_TOKEN,
})

testGoCardlessIntegration(BunTester, integration)
