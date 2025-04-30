import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi' // Assuming this path based on pattern
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import type { ZoomError } from '/domain/integrations/Zoom/ZoomTypes'
import type {
  CreateEventSubscriptionParams,
  EventSubscription,
  GetUserEventSubscriptionsParams,
  GetUserEventSubscriptionsResponse,
} from '/domain/integrations/Zoom/ZoomTypes'
import axios, { AxiosError, type AxiosInstance } from 'axios'

export class ZoomIntegration implements IZoomIntegration {
  private _api: AxiosInstance
  private _auth: AxiosInstance

  constructor(public config: ZoomConfig) {
    this._api = axios.create({
      baseURL: config.baseUrl ?? 'https://api.zoom.us/v2',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const credentials = `${config.clientId}:${config.clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    this._auth = axios.create({
      baseURL: config.authBaseUrl ?? 'https://zoom.us',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    })
  }
  authorizationUrl = (redirectUri: string) => {
    const baseUrl = this.config.authBaseUrl ?? 'https://zoom.us'
    return `${baseUrl}/oauth/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${redirectUri}`
  }

  getAccessTokenFromCode = async (
    code: string,
    redirectUri: string
  ): Promise<IntegrationResponse<OAuthAccessToken>> => {
    try {
      const response = await this._auth.post('/oauth/token', {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      })
      return {
        data: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in,
          scope: response.data.scope,
          token_type: response.data.token_type,
        },
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  getAccessTokenFromRefreshToken = async (
    refreshToken: string
  ): Promise<IntegrationResponse<OAuthAccessToken>> => {
    try {
      const response = await this._auth.post('/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      return {
        data: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in,
          scope: response.data.scope,
          token_type: response.data.token_type,
        },
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { code, message } = error.response.data as ZoomError
      return {
        error: {
          status: error.response.status,
          message: `${code}: ${message}`,
        },
      }
    }
    throw error
  }

  testConnection = async (accessToken?: string): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      return this._responseError(error)
    }
  }

  createEventSubscription = async (
    params: CreateEventSubscriptionParams,
    accessToken?: string
  ): Promise<IntegrationResponse<EventSubscription>> => {
    try {
      const response = await this._api.post('/marketplace/app/event_subscription', params, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return {
        data: response.data as EventSubscription,
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  deleteEventSubscription = async (
    eventSubscriptionId: string,
    accessToken?: string
  ): Promise<IntegrationResponse<void>> => {
    try {
      await this._api.delete(`/marketplace/app/event_subscription/${eventSubscriptionId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return { data: undefined }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  getUserEventSubscriptions = async (
    params: GetUserEventSubscriptionsParams,
    accessToken?: string
  ): Promise<IntegrationResponse<GetUserEventSubscriptionsResponse>> => {
    try {
      // Build the query parameters
      const queryParams = new URLSearchParams()
      if (params.page_size) queryParams.append('page_size', params.page_size.toString())
      if (params.next_page_token) queryParams.append('next_page_token', params.next_page_token)
      if (params.user_id) queryParams.append('user_id', params.user_id)
      if (params.subscription_scope)
        queryParams.append('subscription_scope', params.subscription_scope)
      if (params.account_id) queryParams.append('account_id', params.account_id)

      const response = await this._api.get(
        `/marketplace/app/event_subscription?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return {
        data: response.data as GetUserEventSubscriptionsResponse,
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }
}
