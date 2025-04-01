import { BaseSpi } from './base'
import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'
import type {
  GetAuthorizationCodeParams,
  GetAccessTokenParams,
  CreateWebhookSubscriptionParams,
} from '/domain/integrations/Calendly/CalendlyTypes'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi extends BaseSpi<ICalendlyIntegration> implements ICalendlySpi {
  constructor(integration: ICalendlyIntegration) {
    super(integration)
  }

  getAuthorizationCode = async (params: GetAuthorizationCodeParams) => {
    return this._integration.getAuthorizationCode(params)
  }

  getAccessToken = async (params: GetAccessTokenParams) => {
    return this._integration.getAccessToken(params)
  }

  createWebhookSubscription = async (params: CreateWebhookSubscriptionParams) => {
    return this._integration.createWebhookSubscription(params)
  }
}
