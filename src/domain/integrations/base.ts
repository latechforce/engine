import { ConfigError } from '../entities/Error/Config'

export interface BaseSpi {
  checkConfiguration: () => Promise<IntegrationResponseError | undefined>
}

export interface IntegrationResponseData<D> {
  data: D
  error?: undefined
}

export interface IntegrationResponseError {
  data?: undefined
  error: {
    status: number
    code: string
    detail: string
  }
}

export type IntegrationResponse<T> = IntegrationResponseData<T> | IntegrationResponseError

export class Integration<T extends BaseSpi> {
  private _isConfigurationChecked = false

  constructor(protected _spi: T) {}

  checkConfiguration = async (): Promise<ConfigError[]> => {
    if (this._isConfigurationChecked) return []
    const response = await this._spi.checkConfiguration()
    this._isConfigurationChecked = true
    if (response)
      return [
        new ConfigError({
          entity: 'Integration',
          name: this.constructor.name,
          message: response.error.detail,
        }),
      ]
    return []
  }

  protected _throwError = (method: string, error: IntegrationResponseError['error']) => {
    throw new Error(
      `${error.status} error "${error.code}" from ${this.constructor.name} ${method} API: ${error.detail}`
    )
  }
}
