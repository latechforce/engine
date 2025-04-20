import { BaseSpi, type BaseIntegration } from './base'
import type { BaseConfig } from '/domain/integrations/base'

export interface OauthIntegration<T extends BaseConfig> extends BaseIntegration<T> {
  authorizationUrl: (redirectUri: string) => string
}

export class OauthSpi<C extends BaseConfig, T extends OauthIntegration<C>> extends BaseSpi<C, T> {
  constructor(protected _integration: T) {
    super(_integration)
  }

  authorizationUrl = (redirectUri: string) => {
    return this._integration.authorizationUrl(redirectUri)
  }
}
