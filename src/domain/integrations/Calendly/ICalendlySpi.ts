import type { BaseSpi, IntegrationResponse } from '../base'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
} from './CalendlyTypes'

export interface ICalendlySpi extends BaseSpi {
  currentUser: () => Promise<IntegrationResponse<CalendlyUser>>
  createWebhookSubscription: (
    params: CreateWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>>
  listWebhookSubscriptions: (
    params: ListWebhookSubscriptionsParams
  ) => Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>>
}
