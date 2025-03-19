import type { IntegrationResponseError } from '/domain/integrations/base'

export interface BaseIntegration {
  checkConfiguration: () => Promise<IntegrationResponseError | undefined>
}

export class BaseSpi<T extends BaseIntegration> {
  constructor(protected _integration: T) {}

  checkConfiguration = async () => {
    return this._integration.checkConfiguration()
  }
}
