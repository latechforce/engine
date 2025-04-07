import type { BaseSpi, IntegrationResponse } from '../base'
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

export interface ICalendlySpi extends BaseSpi {
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
