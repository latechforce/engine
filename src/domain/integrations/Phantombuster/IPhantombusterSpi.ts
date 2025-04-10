import type { PhantombusterAgentOutput } from './PhantombusterTypes'
import type { BaseSpi, IntegrationResponse } from '../base'
import type { PhantombusterConfig } from './PhantombusterConfig'

export interface IPhantombusterSpi extends BaseSpi<PhantombusterConfig> {
  fetchAgentOutput: (agentId: string) => Promise<IntegrationResponse<PhantombusterAgentOutput>>
}
