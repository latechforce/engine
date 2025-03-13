export interface PhantombusterConfig {
  apiKey: string
}

export interface PhantombusterAgentOutput {
  containerId: string
  status: 'starting' | 'running' | 'finished' | 'unknown' | 'launch error'
  output?: string
  outputPos?: number
  mostRecentEnded?: number
  progress?: number
  progressLabel?: string
  isAgentRunning?: boolean
  canSoftAbort?: boolean
}

export interface IPhantombusterSpi {
  getConfig: () => PhantombusterConfig
  fetchAgentOutput: (agentId: string) => Promise<PhantombusterAgentOutput>
}

export interface PhantombusterCodeRunnerIntegration {
  fetchAgentOutput: (agentId: string) => Promise<PhantombusterAgentOutput>
}

export class Phantombuster {
  constructor(private _spi: IPhantombusterSpi) {}

  get codeRunnerIntegration(): PhantombusterCodeRunnerIntegration {
    return {
      fetchAgentOutput: this.fetchAgentOutput,
    }
  }

  getConfig = (): PhantombusterConfig => {
    return this._spi.getConfig()
  }

  fetchAgentOutput = async (agentId: string): Promise<PhantombusterAgentOutput> => {
    return this._spi.fetchAgentOutput(agentId)
  }
}
