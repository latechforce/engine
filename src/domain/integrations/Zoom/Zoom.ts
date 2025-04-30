import type { IZoomSpi } from './IZoomSpi'
import type { ZoomConfig } from './ZoomConfig'
import { OAuthIntegration, type OAuthService } from '../OAuth'
import type {
  CreateEventSubscriptionParams,
  EventSubscription,
  GetUserEventSubscriptionsParams,
  GetUserEventSubscriptionsResponse,
  RegisterWebhookParams,
} from './ZoomTypes'

// Just duplicate the template without filling it
export class Zoom extends OAuthIntegration<ZoomConfig, IZoomSpi> {
  constructor(spis: IZoomSpi[], services: OAuthService) {
    super('zoom', spis, services)
  }

  createEventSubscription = async (
    account: string,
    params: CreateEventSubscriptionParams
  ): Promise<EventSubscription> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).createEventSubscription(params, accessToken)
    if (response.error)
      return OAuthIntegration.throwError('createEventSubscription', response.error)
    return response.data
  }

  deleteEventSubscription = async (account: string, eventSubscriptionId: string): Promise<void> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).deleteEventSubscription(
      eventSubscriptionId,
      accessToken
    )
    if (response.error)
      return OAuthIntegration.throwError('deleteEventSubscription', response.error)
    return response.data
  }

  getUserEventSubscriptions = async (
    account: string,
    params: GetUserEventSubscriptionsParams
  ): Promise<GetUserEventSubscriptionsResponse> => {
    const accessToken = await this.getAccessToken(account)
    const response = await this._spi(account).getUserEventSubscriptions(params, accessToken)
    if (response.error)
      return OAuthIntegration.throwError('getUserEventSubscriptions', response.error)
    return response.data
  }

  registerWebhook = async (account: string, params: RegisterWebhookParams): Promise<void> => {
    const accessToken = await this.getAccessToken(account)

    const response = await this._spi(account).registerWebhook(params, accessToken)
    if (response.error) return OAuthIntegration.throwError('registerWebhook', response.error)
    return response.data
  }
}
