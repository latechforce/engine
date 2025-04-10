import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { YouCanBookMeError } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import type { YouCanBookMeProfile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import axios, { AxiosError, type AxiosInstance } from 'axios'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private _instance: AxiosInstance
  private _userId: string

  constructor(public config: YouCanBookMeConfig) {
    this._instance = axios.create({
      baseURL: config?.baseUrl ?? 'https://api.youcanbook.me/v1',
      auth: {
        username: config?.user.username ?? '',
        password: config?.user.password ?? '',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    this._userId = config?.user.username ?? ''
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { message } = error.response.data as YouCanBookMeError
      return {
        error: {
          status: error.response.status,
          message: `${message}`,
        },
      }
    }
    throw error
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._instance.get(`/profiles/${this._userId}`)
    } catch (error) {
      return this._responseError(error)
    }
  }

  getProfile = async (profileId: string): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    try {
      const response = await this._instance.get<YouCanBookMeProfile>(`/profiles/${profileId}`)
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    try {
      const response = await this._instance.patch<YouCanBookMeProfile>(
        `/profiles/${profileId}`,
        profile
      )
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
