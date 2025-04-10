import type { PhantombusterAgentOutput } from './PhantombusterTypes'

export interface PhantombusterCodeRunner {
  fetchAgentOutput: (account: string, agentId: string) => Promise<PhantombusterAgentOutput>
}
