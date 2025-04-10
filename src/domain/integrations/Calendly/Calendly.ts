import type { ICalendlySpi } from './ICalendlySpi'
import { Integration } from '../base'
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
import type { CalendlyConfig } from './CalendlyConfig'

export class Calendly extends Integration<CalendlyConfig, ICalendlySpi> {
  constructor(spis: ICalendlySpi[]) {
    super(spis)
  }

  currentUser = async (account: string): Promise<CalendlyUser> => {
    const response = await this._spi(account).currentUser()
    if (response.error) return Integration.throwError('currentUser', response.error)
    return response.data
  }

  createWebhookSubscription = async (
    account: string,
    params: CreateWebhookSubscriptionParams
  ): Promise<CreateWebhookSubscriptionResponse> => {
    const response = await this._spi(account).createWebhookSubscription(params)
    if (response.error) return Integration.throwError('createWebhookSubscription', response.error)
    return response.data
  }

  listWebhookSubscriptions = async (
    account: string,
    params: ListWebhookSubscriptionsParams
  ): Promise<ListWebhookSubscriptionsResponse> => {
    const response = await this._spi(account).listWebhookSubscriptions(params)
    if (response.error) return Integration.throwError('listWebhookSubscriptions', response.error)
    return response.data
  }

  getWebhookSubscription = async (
    account: string,
    params: GetWebhookSubscriptionParams
  ): Promise<GetWebhookSubscriptionResponse> => {
    const response = await this._spi(account).getWebhookSubscription(params)
    if (response.error) return Integration.throwError('getWebhookSubscription', response.error)
    return response.data
  }

  deleteWebhookSubscription = async (
    account: string,
    params: DeleteWebhookSubscriptionParams
  ): Promise<void> => {
    const response = await this._spi(account).deleteWebhookSubscription(params)
    if (response.error) return Integration.throwError('deleteWebhookSubscription', response.error)
    return response.data
  }
}
