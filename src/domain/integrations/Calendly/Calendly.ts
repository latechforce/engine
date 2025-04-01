import type { ICalendlySpi } from './ICalendlySpi'
import { Integration } from '../base'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
} from './CalendlyTypes'

export class Calendly extends Integration<ICalendlySpi> {
  constructor(spi: ICalendlySpi) {
    super(spi)
  }

  currentUser = async (): Promise<CalendlyUser> => {
    const response = await this._spi.currentUser()
    if (response.error) return this._throwError('currentUser', response.error)
    return response.data
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams
  ): Promise<CreateWebhookSubscriptionResponse> => {
    const response = await this._spi.createWebhookSubscription(params)
    if (response.error) return this._throwError('createWebhookSubscription', response.error)
    return response.data
  }

  listWebhookSubscriptions = async (
    params: ListWebhookSubscriptionsParams
  ): Promise<ListWebhookSubscriptionsResponse> => {
    const response = await this._spi.listWebhookSubscriptions(params)
    if (response.error) return this._throwError('listWebhookSubscriptions', response.error)
    return response.data
  }
}
