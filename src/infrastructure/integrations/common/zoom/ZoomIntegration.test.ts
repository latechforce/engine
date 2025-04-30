import { ZoomIntegration } from './ZoomIntegration'
import { testZoomIntegration } from './ZoomIntegrationTest'
import env from '/infrastructure/test/env'
import BunTester from 'bun:test'

const {
  TEST_ZOOM_CLIENT_ID,
  TEST_ZOOM_CLIENT_SECRET,
  TEST_ZOOM_BASE_URL,
  TEST_ZOOM_AUTH_BASE_URL,
} = env

export const integration = new ZoomIntegration({
  account: 'test',
  baseUrl: TEST_ZOOM_BASE_URL,
  clientId: TEST_ZOOM_CLIENT_ID,
  clientSecret: TEST_ZOOM_CLIENT_SECRET,
  authBaseUrl: TEST_ZOOM_AUTH_BASE_URL,
})

testZoomIntegration(BunTester, integration)
