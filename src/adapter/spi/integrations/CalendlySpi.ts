import { BaseSpi } from './base'
import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'
import type { CreateWebhookSubscriptionParams } from '/domain/integrations/Calendly/CalendlyTypes'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi extends BaseSpi<ICalendlyIntegration> implements ICalendlySpi {
  constructor(integration: ICalendlyIntegration) {
    super(integration)
  }

  createWebhookSubscription = async (params: CreateWebhookSubscriptionParams) => {
    return this._integration.createWebhookSubscription(params)
  }
}
