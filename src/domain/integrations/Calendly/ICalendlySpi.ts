import type { IntegrationResponse } from '../base'
import type { OauthSpi } from '../oauth'
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

export interface ICalendlySpi extends OauthSpi<CalendlyConfig> {
  currentUser: () => Promise<IntegrationResponse<CalendlyUser>>
  createWebhookSubscription: (
    params: CreateWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>>
  listWebhookSubscriptions: (
    params: ListWebhookSubscriptionsParams
  ) => Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>>
  getWebhookSubscription: (
    params: GetWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<GetWebhookSubscriptionResponse>>
  deleteWebhookSubscription: (
    params: DeleteWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<void>>
}
