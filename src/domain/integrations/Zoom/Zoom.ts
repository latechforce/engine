import type { IZoomSpi } from './IZoomSpi'
import type { ZoomConfig } from './ZoomConfig'
import { OAuthIntegration, type OAuthService } from '../OAuth'

// Just duplicate the template without filling it
export class Zoom extends OAuthIntegration<ZoomConfig, IZoomSpi> {
  constructor(spis: IZoomSpi[], services: OAuthService) {
    super('zoom', spis, services)
  }
}
