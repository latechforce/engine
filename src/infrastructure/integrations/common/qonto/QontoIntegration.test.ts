import { QontoIntegration } from './QontoIntegration'
import { testQontoIntegration } from './QontoIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const {
  TEST_QONTO_ORGANISATION_SLUG,
  TEST_QONTO_SECRET_KEY,
  TEST_QONTO_STAGING_TOKEN,
  TEST_QONTO_BASE_URL,
} = env

export const integration = new QontoIntegration({
  name: 'test',
  baseUrl: TEST_QONTO_BASE_URL,
  stagingToken: TEST_QONTO_STAGING_TOKEN,
  organisationSlug: TEST_QONTO_ORGANISATION_SLUG,
  secretKey: TEST_QONTO_SECRET_KEY,
})

testQontoIntegration(BunTester, integration)
