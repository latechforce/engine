import { BaseSpi } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { IZoomSpi } from '/domain/integrations/Zoom/IZoomSpi'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'

export type IZoomIntegration = IZoomSpi

export class ZoomSpi extends BaseSpi<ZoomConfig, IZoomIntegration> implements IZoomSpi {
  constructor(integration: IZoomIntegration) {
    super(integration)
  }
  authorizationUrl(redirectUri: string): string {
    return ''
  }
  getAccessTokenFromCode(
    code: string,
    redirectUri: string
  ): Promise<IntegrationResponse<OAuthAccessToken>> {
    return Promise.resolve({
      data: {
        accessToken: '',
      },
    })
  }
  getAccessTokenFromRefreshToken(
    refreshToken: string
  ): Promise<IntegrationResponse<OAuthAccessToken>> {
    return Promise.resolve({
      data: {
        accessToken: '',
      },
    })
  }
}
