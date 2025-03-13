import { PhantombusterIntegration } from './PhantombusterIntegration'
import { testPhantombusterIntegration } from './PhantombusterIntegrationTest'
import env from '../../../test/env'
import BunTester from 'bun:test'

const { TEST_PHANTOMBUSTER_API_KEY } = env

export const integration = new PhantombusterIntegration({
  apiKey: TEST_PHANTOMBUSTER_API_KEY,
})

testPhantombusterIntegration(BunTester, integration)
