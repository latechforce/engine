import type { PhantombusterAgentOutput } from './PhantombusterTypes'
import type { PhantombusterConfig } from './PhantombusterConfig'
import type { IPhantombusterSpi } from './IPhantombusterSpi'
import type { PhantombusterCodeRunner } from './PhantombusterCodeRunner'
import { Integration, type BaseServices } from '../base'

export class Phantombuster extends Integration<PhantombusterConfig, IPhantombusterSpi> {
  constructor(spis: IPhantombusterSpi[], services: BaseServices) {
    super('phantombuster', spis, services)
  }

  get codeRunnerIntegration(): PhantombusterCodeRunner {
    return {
      fetchAgentOutput: this.fetchAgentOutput,
    }
  }

  fetchAgentOutput = async (
    account: string,
    agentId: string
  ): Promise<PhantombusterAgentOutput> => {
    const response = await this._spi(account).fetchAgentOutput(agentId)
    if (response.error) return Integration.throwError('fetchAgentOutput', response.error)
    return response.data
  }
}
