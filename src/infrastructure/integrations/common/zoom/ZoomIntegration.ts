import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi' // Assuming this path based on pattern
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import type { ZoomError } from '/domain/integrations/Zoom/ZoomTypes'
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

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Use the standard /users/me endpoint to verify authentication
      await this._api.get('/users/me')
      // If the request succeeds, connection is considered valid
      return undefined
    } catch (error) {
      // If request fails, map the error
      return this._responseError(error)
    }
  }

  // Placeholder for future specific Zoom API methods
  // Example:
  // sendNotification = async (userId: string, message: string): Promise<IntegrationResponse<void>> => {
  //   try {
  //     await this._instance.post('/app/notifications', { user_id: userId, message: { text: message } });
  //     return { data: undefined };
  //   } catch (error) {
  //     return this._responseError(error);
  //   }
  // }
}
