import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { join } from 'path'

export class PappersIntegration implements IPappersIntegration {
  private _instance: AxiosInstance

  constructor(public config: PappersConfig) {
    const { apiKey, baseUrl = 'https://api.pappers.fr' } = config
    this._instance = axios.create({
      baseURL: join(baseUrl, 'v2'),
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response
      return {
        error: { status, message: data.error },
      }
    }
    throw error
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/suivi-jetons')
    } catch (error) {
      return this._responseError(error)
    }
  }

  getCompany = async (siret: string): Promise<IntegrationResponse<PappersEntreprise>> => {
    try {
      const response = await this._instance.get('/entreprise', { params: { siret } })
      return {
        data: response.data,
      }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
