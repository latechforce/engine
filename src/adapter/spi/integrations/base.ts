import type { BaseConfig, IntegrationResponseError } from '/domain/integrations/base'

export interface BaseIntegration<T extends BaseConfig> {
  config: T
  testConnection: (accessToken?: string) => Promise<IntegrationResponseError | undefined>
}

export class BaseSpi<C extends BaseConfig, T extends BaseIntegration<C>> {
  constructor(protected _integration: T) {}

  get config(): C {
    return this._integration.config
  }

  testConnection = async (accessToken?: string) => {
    return this._integration.testConnection(accessToken)
  }
}
