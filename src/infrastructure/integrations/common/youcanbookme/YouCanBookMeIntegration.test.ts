import { YouCanBookMeIntegration } from './YouCanBookMeIntegration'
import { testYouCanBookMeIntegration } from './YouCanBookMeIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const { TEST_YOUCANBOOKME_BASE_URL, TEST_YOUCANBOOKME_USERNAME, TEST_YOUCANBOOKME_PASSWORD } = env

export const integration = new YouCanBookMeIntegration({
  account: 'test',
  baseUrl: TEST_YOUCANBOOKME_BASE_URL,
  user: {
    username: TEST_YOUCANBOOKME_USERNAME,
    password: TEST_YOUCANBOOKME_PASSWORD,
  },
})

testYouCanBookMeIntegration(BunTester, integration)
