import type { IZoomSpi } from './IZoomSpi'
import { Integration } from '../base'
import type { ZoomConfig } from './ZoomConfig'
import type { OAuthService } from '../OAuth'

// Just duplicate the template without filling it
export class Zoom extends Integration<ZoomConfig, IZoomSpi> {
  constructor(spis: IZoomSpi[], services: OAuthService) {
    super('zoom', spis, services)
  }
}
