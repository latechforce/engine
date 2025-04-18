import { ConfigError, type ConfigErrorEntity } from '../entities/Error/Config'

export type BaseConfig = {
  account: string
  baseUrl?: string
}

export interface BaseSpi<T extends BaseConfig> {
  config: T
  testConnection: () => Promise<IntegrationResponseError | undefined>
}

export interface IntegrationResponseData<D> {
  data: D
  error?: undefined
}

export interface IntegrationResponseError {
  data?: undefined
  error: {
    status: number
    message?: string
  }
}

export type IntegrationResponse<T> = IntegrationResponseData<T> | IntegrationResponseError

export class Integration<C extends BaseConfig, T extends BaseSpi<C>> {
  private _isAccountValidated: { [key: string]: boolean } = {}

  constructor(private _spis: T[]) {}

  protected _spi = (account: string): T => {
    const spi = this._spis.find((spi) => spi.config.account === account)
    if (!spi) {
      throw new Error(`Account not found for name: ${account}`)
    }
    return spi
  }

  protected _config = (account: string): C => {
    return this._spi(account).config
  }

  validate = async (params: {
    account: string
    entity: ConfigErrorEntity
    name: string
  }): Promise<ConfigError[]> => {
    const { account, entity, name } = params
    if (this._isAccountValidated[account]) return []
    const spi = this._spis.find((spi) => spi.config.account === account)
    if (!spi) {
      return [new ConfigError({ entity, name, message: 'Account not found' })]
    }
    const response = await spi.testConnection()
    if (response?.error) {
      return [new ConfigError({ entity, name, message: response.error.message || 'Unknown error' })]
    }
    this._isAccountValidated[account] = true
    return []
  }

  static throwError = (method: string, error: IntegrationResponseError['error']) => {
    throw new Error(
      `${error.status} error from ${this.constructor.name} ${method} API: ${error.message}`
    )
  }
}
