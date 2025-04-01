import type { BaseSpi, IntegrationResponse } from '../base'
import type {
  GetAuthorizationCodeParams,
  GetAuthorizationCodeResponse,
  GetAccessTokenParams,
  GetAccessTokenResponse,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
} from './CalendlyTypes'

export interface ICalendlySpi extends BaseSpi {
  getAuthorizationCode: (
    params: GetAuthorizationCodeParams
  ) => Promise<IntegrationResponse<GetAuthorizationCodeResponse>>
  getAccessToken: (
    params: GetAccessTokenParams
  ) => Promise<IntegrationResponse<GetAccessTokenResponse>>
  createWebhookSubscription: (
    params: CreateWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>>
}
