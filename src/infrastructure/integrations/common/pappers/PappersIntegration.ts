import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class PappersIntegration implements IPappersIntegration {
  private _instance: AxiosInstance

  constructor(private _config?: PappersConfig) {
    this._instance = axios.create({
      baseURL: 'https://api.pappers.fr/v2',
      headers: {
        'Content-Type': 'application/json',
        'api-key': _config?.apiKey,
      },
    })
  }

  private _errorMapper = (response: AxiosResponse): IntegrationResponseError => {
    return {
      error: { status: response.status },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/suivi-jetons')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  getCompany = async (siret: string): Promise<IntegrationResponse<PappersEntreprise>> => {
    try {
      const response = await this._instance.get('/entreprise', { params: { siret } })
      return {
        data: response.data,
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
