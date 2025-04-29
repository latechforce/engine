import type { IZoomSpi } from './IZoomSpi'
import type { ZoomConfig } from './ZoomConfig'
import { OAuthIntegration, type OAuthService } from '../OAuth'
import type { CreateEventSubscriptionParams, EventSubscription } from './ZoomTypes'

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
}
