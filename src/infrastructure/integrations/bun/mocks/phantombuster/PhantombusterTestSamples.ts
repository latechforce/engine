import type { PhantombusterAgentOutput } from '/domain/integrations/Phantombuster'
import env from '/infrastructure/test/env'

const { TEST_PHANTOMBUSTER_AGENT_ID } = env

export const phantombusterAgentOutputSample: PhantombusterAgentOutput = {
  containerId: TEST_PHANTOMBUSTER_AGENT_ID,
  status: 'finished',
  output: JSON.stringify({
    data: 'test output data',
  }),
}
