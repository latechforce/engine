import type {
  IPhantombusterSpi,
  PhantombusterConfig,
  PhantombusterAgentOutput,
} from '/domain/integrations/Phantombuster'

export interface IPhantombusterIntegration {
  getConfig: () => PhantombusterConfig
  fetchAgentOutput: (agentId: string) => Promise<PhantombusterAgentOutput>
}

export class PhantombusterSpi implements IPhantombusterSpi {
  constructor(private _integration: IPhantombusterIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  fetchAgentOutput = async (agentId: string) => {
    return this._integration.fetchAgentOutput(agentId)
  }
}
