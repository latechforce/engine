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

export class CalendlyIntegration implements ICalendlyIntegration {
  private _instance: AxiosInstance

  constructor(public config: CalendlyConfig) {
    this._instance = axios.create({
      baseURL: config.baseUrl ?? 'https://api.calendly.com',
      headers: {
        Authorization: `Bearer ${config.user.accessToken}`,
        'Content-Type': 'application/json',
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

  // TODO: Add a method to manage a OAuth2 authentification for V2 API

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Using the /users endpoint as it's a lightweight call to verify authentication
      await this._instance.get<CalendlyUserResponse>('/users/me')
    } catch (error) {
      return this._responseError(error)
    }
  }

  currentUser = async (): Promise<IntegrationResponse<CalendlyUser>> => {
    try {
      const response = await this._instance.get<CalendlyUserResponse>('/users/me')
      return {
        data: response.data.resource,
      }
    } catch (error: unknown) {
      return this._responseError(error)
    }
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams
  ): Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>> => {
    try {
      const response = await this._instance.post('/webhook_subscriptions', {
        url: params.url,
        events: params.events,
        organization: params.organization,
        scope: params.scope,
        ...(params.user && { user: params.user }),
      })

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
    params: ListWebhookSubscriptionsParams
  ): Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>> => {
    try {
      const response = await this._instance.get<ListWebhookSubscriptionsResponse>(
        '/webhook_subscriptions',
        {
          params: {
            organization: params.organization,
            scope: params.scope,
            ...(params.user && { user: params.user }),
            ...(params.count && { count: params.count }),
            ...(params.pageToken && { page_token: params.pageToken }),
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
    params: GetWebhookSubscriptionParams
  ): Promise<IntegrationResponse<GetWebhookSubscriptionResponse>> => {
    try {
      const url = new URL(params.webhook_uri)

      const response = await this._instance.get<GetWebhookSubscriptionResponse>(`${url.pathname}`)
      return { data: response.data }
    } catch (error) {
      return this._responseError(error)
    }
  }

  deleteWebhookSubscription = async (
    params: DeleteWebhookSubscriptionParams
  ): Promise<IntegrationResponse<void>> => {
    try {
      const url = new URL(params.webhook_uri)

      await this._instance.delete(`${url.pathname}`)
      return { data: undefined }
    } catch (error) {
      return this._responseError(error)
    }
  }
}
