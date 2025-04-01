import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import type { CalendlyError } from '/domain/integrations/Calendly/CalendlyTypes'
import type {
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
} from '/domain/integrations/Calendly/CalendlyTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class CalendlyIntegration implements ICalendlyIntegration {
  private _instance: AxiosInstance

  constructor(config?: CalendlyConfig) {
    this._instance = axios.create({
      baseURL: 'https://api.calendly.com',
      headers: {
        Authorization: `Bearer ${config?.user.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  private _errorMapper = (response: AxiosResponse<CalendlyError>): IntegrationResponseError => {
    const { error, errorDescription } = response.data as CalendlyError
    return {
      error: {
        status: response.status,
        message: `${error}: ${errorDescription}`,
      },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Using the /users endpoint as it's a lightweight call to verify authentication
      await this._instance.get('/users/me')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams
  ): Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>> => {
    try {
      const response = await this._instance.post('/webhook_subscriptions', {
        url: params.url,
        events: params.events,
        ...(params.organization && { organization: params.organization }),
        ...(params.user && { user: params.user }),
        ...(params.scope && { scope: params.scope }),
      })

      return {
        data: {
          uri: response.data.uri,
          callbackUrl: response.data.callback_url,
          createdAt: response.data.created_at,
          updatedAt: response.data.updated_at,
          retryStartedAt: response.data.retry_started_at,
          state: response.data.state,
          events: response.data.events,
          scope: response.data.scope,
          organization: response.data.organization,
          user: response.data.user,
          creator: response.data.creator,
        },
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
