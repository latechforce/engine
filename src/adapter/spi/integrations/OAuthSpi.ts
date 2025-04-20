import { BaseSpi, type BaseIntegration } from './base'
import type { BaseConfig, IntegrationResponse } from '/domain/integrations/base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'

export interface OAuthIntegration<T extends BaseConfig> extends BaseIntegration<T> {
  authorizationUrl: (redirectUri: string) => string
  getAccessTokenFromCode: (
    code: string,
    redirectUri: string
  ) => Promise<IntegrationResponse<OAuthAccessToken>>
  getAccessTokenFromRefreshToken: (
    refreshToken: string
  ) => Promise<IntegrationResponse<OAuthAccessToken>>
}

export class OAuthSpi<C extends BaseConfig, T extends OAuthIntegration<C>> extends BaseSpi<C, T> {
  constructor(protected _integration: T) {
    super(_integration)
  }

  authorizationUrl = (redirectUri: string) => {
    return this._integration.authorizationUrl(redirectUri)
  }

  getAccessTokenFromCode = async (code: string, redirectUri: string) => {
    return this._integration.getAccessTokenFromCode(code, redirectUri)
  }

  getAccessTokenFromRefreshToken = async (refreshToken: string) => {
    return this._integration.getAccessTokenFromRefreshToken(refreshToken)
  }
}
