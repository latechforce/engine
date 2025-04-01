import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import type { CalendlyError } from '/domain/integrations/Calendly/CalendlyTypes'
import type { GetAuthorizationCodeParams, GetAuthorizationCodeResponse, GetAccessTokenParams, GetAccessTokenResponse, CreateWebhookSubscriptionParams, CreateWebhookSubscriptionResponse } from '/domain/integrations/Calendly/CalendlyTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class CalendlyIntegration implements ICalendlyIntegration {
  private _instance: AxiosInstance
  private _authInstance: AxiosInstance

  constructor(config?: CalendlyConfig) {
    const headers = {
      Authorization: `Bearer ${config?.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: 'https://api.calendly.com',
      headers,
    })

    this._authInstance = axios.create({
      baseURL: 'https://auth.calendly.com',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }
    })
  }

  private _errorMapper = (response: AxiosResponse<CalendlyError>): IntegrationResponseError => {
    const { title, message } = response.data
    return {
      error: {
        status: response.status,
        message: `${title}: ${message}`,
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

  getAuthorizationCode = async (params: GetAuthorizationCodeParams): Promise<{ data?: GetAuthorizationCodeResponse; error?: CalendlyError }> => {
    try {
      const response = await this._authInstance.get('/oauth/authorize', {
        params: {
          client_id: params.clientId,
          response_type: 'code',
          redirect_uri: params.redirectUri,
          ...(params.codeChallengeMethod && { code_challenge_method: params.codeChallengeMethod }),
          ...(params.codeChallenge && { code_challenge: params.codeChallenge })
        }
      })

      // L'API Calendly redirige vers l'URL de redirection avec le code dans les paramètres
      // Cette méthode retourne l'URL complète, le code devra être extrait côté client
      return { data: { code: response.request.res.responseUrl } }
    } catch (error: unknown) {
      return {
        error: {
          error: 'authorization_failed',
          errorDescription: error instanceof Error ? error.message : 'Failed to get authorization code'
        }
      }
    }
  }

  getAccessToken = async (params: GetAccessTokenParams): Promise<{ data?: GetAccessTokenResponse; error?: CalendlyError }> => {
    try {
      const response = await this._authInstance.post('/oauth/token', {
        client_id: params.clientId,
        client_secret: params.clientSecret,
        grant_type: params.grantType,
        ...(params.code && { code: params.code }),
        ...(params.refreshToken && { refresh_token: params.refreshToken }),
        ...(params.redirectUri && { redirect_uri: params.redirectUri }),
        ...(params.codeVerifier && { code_verifier: params.codeVerifier })
      })

      return {
        data: {
          tokenType: response.data.token_type,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          scope: response.data.scope,
          createdAt: response.data.created_at,
          expiresIn: response.data.expires_in,
          owner: response.data.owner,
          organization: response.data.organization
        }
      }
    } catch (error: unknown) {
      return {
        error: {
          error: 'token_failed',
          errorDescription: error instanceof Error ? error.message : 'Failed to get access token'
        }
      }
    }
  }

  createWebhookSubscription = async (params: CreateWebhookSubscriptionParams): Promise<{ data?: CreateWebhookSubscriptionResponse; error?: CalendlyError }> => {
    try {
      const response = await this._instance.post('/webhook_subscriptions', {
        url: params.url,
        events: params.events,
        ...(params.organization && { organization: params.organization }),
        ...(params.user && { user: params.user }),
        ...(params.scope && { scope: params.scope })
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
          creator: response.data.creator
        }
      }
    } catch (error: unknown) {
      return {
        error: {
          error: 'webhook_subscription_failed',
          errorDescription: error instanceof Error ? error.message : 'Failed to create webhook subscription'
        }
      }
    }
  }
}
