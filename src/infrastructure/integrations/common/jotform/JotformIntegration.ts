import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import axios, { AxiosError, type AxiosInstance } from 'axios'

export class JotformIntegration implements IJotformIntegration {
  private _instance: AxiosInstance

  constructor(public config: JotformConfig) {
    const { baseUrl = 'https://api.jotform.com', apiKey } = config
    const headers = {
      APIKEY: apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: baseUrl,
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { message, status } = error.response.data as {
        message: string
        status: number
      }
      return {
        error: {
          message,
          status,
        },
      }
    }
    throw error
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get('/user')
    } catch (error) {
      return this._responseError(error)
    }
  }
}
