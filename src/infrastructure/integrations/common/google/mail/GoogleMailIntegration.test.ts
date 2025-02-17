import BunTester from 'bun:test'
import { GoogleMailIntegration } from './GoogleMailIntegration'
import { testGoogleMailIntegration } from './GoogleMailIntegrationTest'
import env from '/infrastructure/test/env'

const integration = new GoogleMailIntegration({
  user: env.TEST_GOOGLE_MAIL_USER,
  password: env.TEST_GOOGLE_MAIL_PASSWORD,
})

testGoogleMailIntegration(BunTester, integration)
