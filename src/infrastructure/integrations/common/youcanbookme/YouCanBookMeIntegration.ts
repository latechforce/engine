import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { YouCanBookMeError } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import type { YouCanBookMeProfile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { join } from 'path'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private _instance: AxiosInstance

  constructor(public config: YouCanBookMeConfig) {
    const { baseUrl = 'https://api.youcanbook.me', user } = config
    this._instance = axios.create({
      baseURL: join(baseUrl, 'v1'),
      auth: {
        username: user.username,
        password: user.password,
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
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

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      const { username } = this.config.user
      await this._instance.get(`/profiles/${username}`)
    } catch (error) {
      return this._responseError(error)
    }
    return undefined
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

  currentProfile = async (): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    try {
      const response = await this._instance.get<YouCanBookMeProfile>('/profiles')
      return { data: response.data }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: { status: error.response?.status ?? 500, message: error.message } }
      }
      return { error: { status: 500, message: 'Unknown error' } }
    }
  }

  createProfile = async (
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    try {
      const response = await this._instance.post<YouCanBookMeProfile>('/profiles', profile)
      return { data: response.data }
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: { status: error.response?.status ?? 500, message: error.message } }
      }
      return { error: { status: 500, message: 'Unknown error' } }
    }
  }
}
