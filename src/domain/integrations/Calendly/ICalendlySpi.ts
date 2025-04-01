import type { BaseSpi, IntegrationResponse } from '../base'
import type {
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
} from './CalendlyTypes'

export interface ICalendlySpi extends BaseSpi {
  createWebhookSubscription: (
    params: CreateWebhookSubscriptionParams
  ) => Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>>
}
