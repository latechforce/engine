import type {
  IPhantombusterSpi,
  PhantombusterAgentOutput,
  PhantombusterConfig,
} from '/domain/integrations/Phantombuster'
import { BaseSpi, type BaseIntegration } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'
export interface IPhantombusterIntegration extends BaseIntegration<PhantombusterConfig> {
  fetchAgentOutput: (agentId: string) => Promise<IntegrationResponse<PhantombusterAgentOutput>>
}

export class PhantombusterSpi
  extends BaseSpi<PhantombusterConfig, IPhantombusterIntegration>
  implements IPhantombusterSpi
{
  constructor(integration: IPhantombusterIntegration) {
    super(integration)
  }

  fetchAgentOutput = async (agentId: string) => {
    return this._integration.fetchAgentOutput(agentId)
  }
}
