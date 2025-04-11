import type { BaseConfig, IntegrationResponseError } from '/domain/integrations/base'

export interface BaseIntegration<T extends BaseConfig> {
  config: T
  testConnection: () => Promise<IntegrationResponseError | undefined>
}

export class BaseSpi<C extends BaseConfig, T extends BaseIntegration<C>> {
  constructor(protected _integration: T) {}

  get config(): C {
    return this._integration.config
  }

  testConnection = async () => {
    return this._integration.testConnection()
  }
}
