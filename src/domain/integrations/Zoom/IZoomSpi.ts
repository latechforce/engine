import type { OAuthSpi } from '../OAuth'
import type { ZoomConfig } from './ZoomConfig'
// Just duplicate the template without filling it
export interface IZoomSpi extends OAuthSpi<ZoomConfig> {}
