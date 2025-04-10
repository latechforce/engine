import { BaseSpi } from './base'
import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'
import type {
  CreateWebhookSubscriptionParams,
  ListWebhookSubscriptionsParams,
  GetWebhookSubscriptionParams,
  DeleteWebhookSubscriptionParams,
} from '/domain/integrations/Calendly/CalendlyTypes'
import type { CalendlyConfig } from '/domain/integrations/Calendly'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi
  extends BaseSpi<CalendlyConfig, ICalendlyIntegration>
  implements ICalendlySpi
{
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

  getWebhookSubscription = async (params: GetWebhookSubscriptionParams) => {
    return this._integration.getWebhookSubscription(params)
  }

  deleteWebhookSubscription = async (params: DeleteWebhookSubscriptionParams) => {
    return this._integration.deleteWebhookSubscription(params)
  }
}
