import { BaseSpi } from './base'
import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'
import type {
  CreateWebhookSubscriptionParams,
  ListWebhookSubscriptionsParams,
} from '/domain/integrations/Calendly/CalendlyTypes'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi extends BaseSpi<ICalendlyIntegration> implements ICalendlySpi {
  constructor(integration: ICalendlyIntegration) {
    super(integration)
  }

  currentUser = async () => {
    return this._integration.currentUser()
  }

  createWebhookSubscription = async (params: CreateWebhookSubscriptionParams) => {
    return this._integration.createWebhookSubscription(params)
  }

  listWebhookSubscriptions = async (params: ListWebhookSubscriptionsParams) => {
    return this._integration.listWebhookSubscriptions(params)
  }
}
