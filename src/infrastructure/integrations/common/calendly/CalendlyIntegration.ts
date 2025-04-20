import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import type {
  CalendlyError,
  CalendlyUser,
  CalendlyUserResponse,
} from '/domain/integrations/Calendly/CalendlyTypes'
import type {
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
  GetWebhookSubscriptionParams,
  GetWebhookSubscriptionResponse,
  DeleteWebhookSubscriptionParams,
} from '/domain/integrations/Calendly/CalendlyTypes'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { OAuthAccessToken } from '../../../../domain/integrations/OAuth'

export class CalendlyIntegration implements ICalendlyIntegration {
  private _api: AxiosInstance
  private _auth: AxiosInstance

  constructor(public config: CalendlyConfig) {
    this._api = axios.create({
      baseURL: config.baseUrl ?? 'https://api.calendly.com',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const credentials = `${config.clientId}:${config.clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    this._auth = axios.create({
      baseURL: config.authBaseUrl ?? 'https://auth.calendly.com',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    })
  }

  private _responseError = (error: unknown): IntegrationResponseError => {
    if (error instanceof AxiosError && error.response) {
      const { title, message } = error.response.data as CalendlyError
      return {
        error: {
          status: error.response.status,
          message: `${title}: ${message}`,
        },
      }
    }
    throw error
  }

  authorizationUrl = (redirectUri: string) => {
    const baseUrl = this.config.authBaseUrl ?? 'https://auth.calendly.com'
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

  testConnection = async (accessToken?: string): Promise<IntegrationResponseError | undefined> => {
    try {
      await this._api.get<CalendlyUserResponse>('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
        },
      })
    } catch (error) {
      return this._responseError(error)
    }
  }

  currentUser = async (accessToken?: string): Promise<IntegrationResponse<CalendlyUser>> => {
    try {
      const response = await this._api.get<CalendlyUserResponse>('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
        },
      })
      return {
        data: response.data.resource,
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams,
    accessToken?: string
  ): Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>> => {
    try {
      const response = await this._api.post(
        '/webhook_subscriptions',
        {
          url: params.url,
          events: params.events,
          organization: params.organization,
          scope: params.scope,
          ...(params.user && { user: params.user }),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
          },
        }
      )

      const resource = response.data.resource

      return {
        data: {
          uri: resource.uri,
          callbackUrl: resource.callback_url,
          createdAt: resource.created_at,
          updatedAt: resource.updated_at,
          retryStartedAt: resource.retry_started_at,
          state: resource.state,
          events: resource.events,
          scope: resource.scope,
          organization: resource.organization,
          user: resource.user,
          creator: resource.creator,
        },
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  listWebhookSubscriptions = async (
    params: ListWebhookSubscriptionsParams,
    accessToken?: string
  ): Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>> => {
    try {
      const response = await this._api.get<ListWebhookSubscriptionsResponse>(
        '/webhook_subscriptions',
        {
          params: {
            organization: params.organization,
            scope: params.scope,
            ...(params.user && { user: params.user }),
            ...(params.count && { count: params.count }),
            ...(params.pageToken && { page_token: params.pageToken }),
          },
          headers: {
            Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
          },
        }
      )
      return {
        data: {
          collection: response.data.collection.map((subscription) => ({
            uri: subscription.uri,
            callback_url: subscription.callback_url,
            created_at: subscription.created_at,
            updated_at: subscription.updated_at,
            retry_started_at: subscription.retry_started_at,
            state: subscription.state,
            events: subscription.events,
            scope: subscription.scope,
            organization: subscription.organization,
            user: subscription.user,
            creator: subscription.creator,
          })),
          pagination: {
            count: response.data.pagination.count,
            next_page: response.data.pagination.next_page,
            previous_page: response.data.pagination.previous_page,
            next_page_token: response.data.pagination.next_page_token,
            previous_page_token: response.data.pagination.previous_page_token,
          },
        },
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  getWebhookSubscription = async (
    params: GetWebhookSubscriptionParams,
    accessToken?: string
  ): Promise<IntegrationResponse<GetWebhookSubscriptionResponse>> => {
    try {
      const url = new URL(params.webhook_uri)
      const response = await this._api.get<GetWebhookSubscriptionResponse>(`${url.pathname}`, {
        headers: {
          Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
        },
      })
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }

  deleteWebhookSubscription = async (
    params: DeleteWebhookSubscriptionParams,
    accessToken?: string
  ): Promise<IntegrationResponse<void>> => {
    try {
      const url = new URL(params.webhook_uri)
      await this._api.delete(`${url.pathname}`, {
        headers: {
          Authorization: `Bearer ${accessToken ?? this.config.accessToken}`,
        },
      })
      return { data: undefined }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
