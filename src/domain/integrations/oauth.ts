import type { BaseServices } from './base'
import type { BaseSpi } from './base'
import type { BaseConfig } from './base'
import { Integration } from './base'

export interface OauthSpi<T extends BaseConfig> extends BaseSpi<T> {
  authorizationUrl: (redirectUri: string) => string
}

export class OAuthIntegration<C extends BaseConfig, T extends OauthSpi<C>> extends Integration<
  C,
  T
> {
  constructor(name: string, spis: T[], services: BaseServices) {
    super(name, spis, services)
    this.auth = 'OAuth'
  }

  authorizationUrl = (account: string, redirectUri: string) => {
    return this._spi(account).authorizationUrl(redirectUri)
  }
}
