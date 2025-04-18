import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { join } from 'path'

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
      baseURL: join(baseUrl, 'v1'),
      headers,
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { message, code, status } = error.response.data as {
        message: string
        code?: number
        status?: string
      }
      return {
        error: {
          message,
          code,
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
