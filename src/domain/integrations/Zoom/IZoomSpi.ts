import type { OAuthSpi } from '../OAuth'
import type { ZoomConfig } from './ZoomConfig'
import type { IntegrationResponse } from '../base'
import type { CreateEventSubscriptionParams, EventSubscription } from './ZoomTypes'

// Just duplicate the template without filling it
export interface IZoomSpi extends OAuthSpi<ZoomConfig> {
  createEventSubscription: (
    params: CreateEventSubscriptionParams,
    accessToken?: string
  ) => Promise<IntegrationResponse<EventSubscription>>

  deleteEventSubscription: (
    eventSubscriptionId: string,
    accessToken?: string
  ) => Promise<IntegrationResponse<void>>
}
