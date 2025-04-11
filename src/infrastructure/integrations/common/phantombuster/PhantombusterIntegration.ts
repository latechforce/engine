import type { IPhantombusterIntegration } from '/adapter/spi/integrations/PhantombusterSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type {
  PhantombusterConfig,
  PhantombusterAgentOutput,
} from '/domain/integrations/Phantombuster'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { join } from 'path'

export class PhantombusterIntegration implements IPhantombusterIntegration {
  private _instance: AxiosInstance

  constructor(public config: PhantombusterConfig) {
    const { apiKey, baseUrl = 'https://api.phantombuster.com' } = config
    const headers = {
      'X-Phantombuster-Key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: join(baseUrl, 'api/v2'),
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const [{ status, detail }] = error.response.data.errors
      return {
        error: { status, message: detail },
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/me')
    } catch (error) {
      return this._responseError(error)
    }
  }

  fetchAgentOutput = async (
    agentId: string
  ): Promise<IntegrationResponse<PhantombusterAgentOutput>> => {
    try {
      const response = await this._instance.get(`/agents/fetch-output?id=${agentId}`)
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
