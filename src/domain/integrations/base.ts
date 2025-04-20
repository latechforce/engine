import { ConfigError, type ConfigErrorEntity } from '../entities/Error/Config'
import type { PostRequest } from '../entities/Request/Post'
import { JsonResponse } from '../entities/Response/Json'
import type { SchemaValidator, SchemaValidatorJson, Server } from '/domain/services'

export type BaseConfig = {
  account: string
  baseUrl?: string
}

export type BaseServices = {
  server: Server
  schemaValidator: SchemaValidator
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
  public auth: 'ApiKey' | 'OAuth' = 'ApiKey'
  public isUsed: boolean = false

  private _isAccountValidated: { [key: string]: boolean } = {}

  constructor(
    private _name: string,
    private _spis: T[],
    private _services: BaseServices
  ) {
    this.isUsed = this._spis.length > 0
  }

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

  get accounts() {
    return this._spis.map((spi) => spi.config.account)
  }

  async init(): Promise<boolean> {
    const { server } = this._services
    if (this._spis.length === 0) return false
    await server.post(`/api/integration/${this._name}/test-connection`, this.postTestConnection)
    return true
  }

  postTestConnection = async (request: PostRequest) => {
    const { schemaValidator } = this._services
    const schema: SchemaValidatorJson = {
      type: 'object',
      properties: {
        account: { type: 'string' },
      },
      required: ['account'],
    }
    const { body } = request
    if (schemaValidator.validateType<{ account: string }>(body, schema)) {
      const spi = this._spis.find((spi) => spi.config.account === body.account)
      if (!spi) {
        return new JsonResponse({ error: 'Account not found' }, 404)
      }
      const response = await spi.testConnection()
      if (response?.error) {
        return new JsonResponse(
          { success: false, error: response.error.message || 'Unknown error' },
          400
        )
      }
      return new JsonResponse({ success: true })
    }
    const [error] = schemaValidator.validate(body, schema)
    return new JsonResponse({ error: error.message }, 400)
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
