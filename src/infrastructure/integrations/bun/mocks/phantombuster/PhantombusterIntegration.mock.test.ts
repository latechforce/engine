import { PhantombusterIntegration } from './PhantombusterIntegration.mock'
import { testPhantombusterIntegration } from '/infrastructure/integrations/common/phantombuster/PhantombusterIntegrationTest'
import BunTester from 'bun:test'
import env from '/infrastructure/test/env'

const { TEST_PHANTOMBUSTER_AGENT_ID } = env

export const integration = new PhantombusterIntegration({
  apiKey: ':memory:',
})

await integration.addAgentOutput(TEST_PHANTOMBUSTER_AGENT_ID, {
  containerId: 'test',
  status: 'finished',
})

testPhantombusterIntegration(BunTester, integration)
