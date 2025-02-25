import { GoCardlessIntegration } from './GoCardlessIntegration'
import { testGoCardlessIntegration } from './GoCardlessIntegrationTest'
import env from '../../../test/env'
import BunTester from 'bun:test'

const { TEST_GOCARDLESS_ACCESS_TOKEN } = env

export const integration = new GoCardlessIntegration({
  environment: 'sandbox',
  accessToken: TEST_GOCARDLESS_ACCESS_TOKEN,
})

testGoCardlessIntegration(BunTester, integration)
