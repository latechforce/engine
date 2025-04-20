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
import { OAuthIntegration, type OAuthService } from '../OAuth'

export class Calendly extends OAuthIntegration<CalendlyConfig, ICalendlySpi> {
  constructor(spis: ICalendlySpi[], services: OAuthService) {
    super('calendly', spis, services)
  }

  currentUser = async (account: string): Promise<CalendlyUser> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).currentUser(accessToken)
    if (response.error) return Integration.throwError('currentUser', response.error)
    return response.data
  }

  createWebhookSubscription = async (
    account: string,
    params: CreateWebhookSubscriptionParams
  ): Promise<CreateWebhookSubscriptionResponse> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).createWebhookSubscription(params, accessToken)
    if (response.error) return Integration.throwError('createWebhookSubscription', response.error)
    return response.data
  }

  listWebhookSubscriptions = async (
    account: string,
    params: ListWebhookSubscriptionsParams
  ): Promise<ListWebhookSubscriptionsResponse> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).listWebhookSubscriptions(params, accessToken)
    if (response.error) return Integration.throwError('listWebhookSubscriptions', response.error)
    return response.data
  }

  getWebhookSubscription = async (
    account: string,
    params: GetWebhookSubscriptionParams
  ): Promise<GetWebhookSubscriptionResponse> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).getWebhookSubscription(params, accessToken)
    if (response.error) return Integration.throwError('getWebhookSubscription', response.error)
    return response.data
  }

  deleteWebhookSubscription = async (
    account: string,
    params: DeleteWebhookSubscriptionParams
  ): Promise<void> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).deleteWebhookSubscription(params, accessToken)
    if (response.error) return Integration.throwError('deleteWebhookSubscription', response.error)
    return response.data
  }
}
