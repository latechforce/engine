import { OAuthSpi } from './OAuthSpi'
import type { IZoomSpi } from '/domain/integrations/Zoom/IZoomSpi'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'

export type IZoomIntegration = IZoomSpi

export class ZoomSpi extends OAuthSpi<ZoomConfig, IZoomIntegration> implements IZoomSpi {
  constructor(integration: IZoomIntegration) {
    super(integration)
  }
}
