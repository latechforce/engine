import type { IntegrationResponse } from '../base'
import type { OAuthSpi } from '../OAuth'
import type { CalendlyConfig } from './CalendlyConfig'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
  GetWebhookSubscriptionParams,
  GetWebhookSubscriptionResponse,
  DeleteWebhookSubscriptionParams,
} from './CalendlyTypes'

export interface ICalendlySpi extends OAuthSpi<CalendlyConfig> {
  currentUser: (accessToken?: string) => Promise<IntegrationResponse<CalendlyUser>>
  createWebhookSubscription: (
    params: CreateWebhookSubscriptionParams,
    accessToken?: string
  ) => Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>>
  listWebhookSubscriptions: (
    params: ListWebhookSubscriptionsParams,
    accessToken?: string
  ) => Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>>
  getWebhookSubscription: (
    params: GetWebhookSubscriptionParams,
    accessToken?: string
  ) => Promise<IntegrationResponse<GetWebhookSubscriptionResponse>>
  deleteWebhookSubscription: (
    params: DeleteWebhookSubscriptionParams,
    accessToken?: string
  ) => Promise<IntegrationResponse<void>>
}
