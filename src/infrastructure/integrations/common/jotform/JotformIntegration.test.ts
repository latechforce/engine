import { JotformIntegration } from './JotformIntegration'
import { testJotformIntegration } from './JotformIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_JOTFORM_API_KEY, TEST_JOTFORM_BASE_URL } = env

export const integration = new JotformIntegration({
  account: 'test',
  apiKey: TEST_JOTFORM_API_KEY,
  baseUrl: TEST_JOTFORM_BASE_URL,
})

testJotformIntegration(BunTester, integration)
