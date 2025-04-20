import type { ICalendlySpi } from '/domain/integrations/Calendly/ICalendlySpi'
import type {
  CreateWebhookSubscriptionParams,
  ListWebhookSubscriptionsParams,
  GetWebhookSubscriptionParams,
  DeleteWebhookSubscriptionParams,
} from '/domain/integrations/Calendly/CalendlyTypes'
import type { CalendlyConfig } from '/domain/integrations/Calendly'
import { OAuthSpi } from './OAuthSpi'

export type ICalendlyIntegration = ICalendlySpi

export class CalendlySpi
  extends OAuthSpi<CalendlyConfig, ICalendlyIntegration>
  implements ICalendlySpi
{
  constructor(integration: ICalendlyIntegration) {
    super(integration)
  }

  currentUser = async (accessToken?: string) => {
    return this._integration.currentUser(accessToken)
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams,
    accessToken?: string
  ) => {
    return this._integration.createWebhookSubscription(params, accessToken)
  }

  listWebhookSubscriptions = async (
    params: ListWebhookSubscriptionsParams,
    accessToken?: string
  ) => {
    return this._integration.listWebhookSubscriptions(params, accessToken)
  }

  getWebhookSubscription = async (params: GetWebhookSubscriptionParams, accessToken?: string) => {
    return this._integration.getWebhookSubscription(params, accessToken)
  }

  deleteWebhookSubscription = async (
    params: DeleteWebhookSubscriptionParams,
    accessToken?: string
  ) => {
    return this._integration.deleteWebhookSubscription(params, accessToken)
  }
}
