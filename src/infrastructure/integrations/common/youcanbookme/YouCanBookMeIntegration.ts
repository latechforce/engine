import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'
import type { YouCanBookMeError } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import type { Profile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class YouCanBookMeIntegration implements IYouCanBookMeIntegration {
  private _instance: AxiosInstance
  private _userId: string

  constructor(config?: YouCanBookMeConfig) {
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
      await this._instance.get(`/profiles/${this._userId}`)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  getProfile = async (profileId: string): Promise<IntegrationResponse<Profile>> => {
    try {
      const response = await this._instance.get<Profile>(`/profiles/${profileId}`)
      return { data: response.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  updateProfile = async (
    profileId: string,
    profile: Partial<Profile>
  ): Promise<IntegrationResponse<Profile>> => {
    try {
      const response = await this._instance.patch<Profile>(`/profiles/${profileId}`, profile)
      return { data: response.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
