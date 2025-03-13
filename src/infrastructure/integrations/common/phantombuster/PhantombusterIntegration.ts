import type { IPhantombusterIntegration } from '/adapter/spi/integrations/PhantombusterSpi'
import type {
  PhantombusterConfig,
  PhantombusterAgentOutput,
} from '/domain/integrations/Phantombuster'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export class PhantombusterIntegration implements IPhantombusterIntegration {
  private _instance?: AxiosInstance

  constructor(private _config?: PhantombusterConfig) {}

  getConfig = (): PhantombusterConfig => {
    if (!this._config) {
      throw new Error('Phantombuster config not set')
    }
    return this._config
  }

  fetchAgentOutput = async (agentId: string): Promise<PhantombusterAgentOutput> => {
    const response = await this._api()
      .get(`/agents/fetch-output?id=${agentId}`)
      .catch((error) => {
        return error.response
      })
    if (response.status === 200) {
      return response.data
    } else {
      return this._throwError(response)
    }
  }

  private _api = (): AxiosInstance => {
    if (!this._instance) {
      const config = this.getConfig()
      const headers = {
        'X-Phantombuster-Key': config.apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      this._instance = axios.create({
        baseURL: 'https://api.phantombuster.com/api/v2',
        headers,
      })
    }
    return this._instance
  }

  private _throwError = (response: AxiosResponse) => {
    const { error } = response.data
    throw new Error(`Error fetching data from Phantombuster API: ${error}`)
  }
}
