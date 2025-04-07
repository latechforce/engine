import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type { YouCanBookMeError } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private _instance: AxiosInstance
  private _userId: string

  constructor(config?: YouCanBookMeConfig) {
    this._instance = axios.create({
      baseURL: config?.baseUrl ?? 'https://api.youcanbook.me/v1',
      headers: {
        Authorization: `Basic ${Buffer.from(`${config?.user.username}:${config?.user.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    this._userId = config?.user.username ?? ''
  }

  private _errorMapper = (response: AxiosResponse<YouCanBookMeError>): IntegrationResponseError => {
    return {
      error: {
        status: response.status,
        message: response.data.message,
      },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get(`/${this._userId}`)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
