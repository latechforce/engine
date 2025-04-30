import { OAuthSpi } from './OAuthSpi'
import type { IZoomSpi } from '/domain/integrations/Zoom/IZoomSpi'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import type {
  CreateEventSubscriptionParams,
  GetUserEventSubscriptionsParams,
  RegisterWebhookParams,
} from '/domain/integrations/Zoom/ZoomTypes'

export type IZoomIntegration = IZoomSpi

export class ZoomSpi extends OAuthSpi<ZoomConfig, IZoomIntegration> implements IZoomSpi {
  constructor(integration: IZoomIntegration) {
    super(integration)
  }

  createEventSubscription = async (params: CreateEventSubscriptionParams, accessToken?: string) => {
    return this._integration.createEventSubscription(params, accessToken)
  }

  deleteEventSubscription = async (eventSubscriptionId: string, accessToken?: string) => {
    return this._integration.deleteEventSubscription(eventSubscriptionId, accessToken)
  }

  getUserEventSubscriptions = async (
    params: GetUserEventSubscriptionsParams,
    accessToken?: string
  ) => {
    return this._integration.getUserEventSubscriptions(params, accessToken)
  }

  registerWebhook = async (params: RegisterWebhookParams, accessToken?: string) => {
    return this._integration.registerWebhook(params, accessToken)
  }
}
