import { SingleLineTextField, NumberField } from '../entities/Field'
import { AndFilter } from '../entities/Filter/And'
import { IsTextFilter } from '../entities/Filter/text/Is'
import type { BaseServices, IntegrationResponse } from './base'
import type { BaseSpi } from './base'
import type { BaseConfig } from './base'
import { Integration } from './base'
import type { Field } from '/domain/entities/Field'
import type { Database, DatabaseTable } from '/domain/services'
import type { Record } from '/domain/entities/Record'
import type { PostRequest } from '../entities/Request/Post'

export type OAuthAccessToken = {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  token_type: string
}

export type OAuthAccount = OAuthAccessToken & {
  integration: string
  account: string
}

export interface OAuthService extends BaseServices {
  database: Database
}

export interface OAuthSpi<T extends BaseConfig> extends BaseSpi<T> {
  authorizationUrl: (redirectUri: string) => string
  getAccessTokenFromCode: (
    code: string,
    redirectUri: string
  ) => Promise<IntegrationResponse<OAuthAccessToken>>
  getAccessTokenFromRefreshToken: (
    refreshToken: string
  ) => Promise<IntegrationResponse<OAuthAccessToken>>
}

export class OAuthIntegration<C extends BaseConfig, T extends OAuthSpi<C>> extends Integration<
  C,
  T
> {
  private _table: DatabaseTable
  private _fields: Field[] = [
    new SingleLineTextField({ name: 'integration', required: true }),
    new SingleLineTextField({ name: 'account', required: true }),
    new SingleLineTextField({ name: 'access_token', required: true }),
    new SingleLineTextField({ name: 'refresh_token', required: true }),
    new NumberField({ name: 'expires_in', required: true }),
    new SingleLineTextField({ name: 'scope', required: true }),
    new SingleLineTextField({ name: 'token_type', required: true }),
  ]

  constructor(name: string, spis: T[], services: OAuthService) {
    super(name, spis, services)
    this.auth = 'OAuth'
    this._table = services.database.table({
      name: 'accounts',
      schema: 'automations',
      fields: this._fields.map((field) => field.config),
    })
  }

  async init(): Promise<boolean> {
    await super.init()
    await this._table.dropView()
    const exists = await this._table.exists()
    if (exists) {
      await this._table.migrate()
    } else {
      await this._table.create()
    }
    await this._table.createView()
    return true
  }

  redirectPath = (): string => {
    return `/auth/${this._name.toLowerCase()}`
  }

  redirectUri = (): string => {
    const { server } = this._services
    return `${server.baseUrl}${this.redirectPath()}`
  }

  authorizationUrl = (account: string): string => {
    return this._spi(account).authorizationUrl(this.redirectUri())
  }

  getAccessToken = async (account: string): Promise<string | undefined> => {
    const record = await this._getAccount(account)
    if (!record) return undefined
    const expiresAt = new Date(record.created_at.getTime() + record.fields.expires_in * 1000)
    if (expiresAt < new Date()) {
      const response = await this._spi(account).getAccessTokenFromRefreshToken(
        record.fields.refresh_token
      )
      if (response.error) return Integration.throwError('getAccessToken', response.error)
      await this._table.update(record.id, response.data)
      return response.data.access_token
    }
    return record.fields.access_token
  }

  getAccessTokenFromCode = async (account: string, code: string): Promise<OAuthAccessToken> => {
    const response = await this._spi(account).getAccessTokenFromCode(code, this.redirectUri())
    if (response.error) return Integration.throwError('getAccessTokenFromCode', response.error)
    await this._upsertAccount(account, response.data)
    return response.data
  }

  isConnected = async (account: string): Promise<boolean> => {
    const record = await this._getAccount(account)
    return record?.fields.access_token !== undefined
  }

  postTestConnection = async (request: PostRequest) => {
    return super.postTestConnection(request, this.getAccessToken)
  }

  private _upsertAccount = async (account: string, token: OAuthAccessToken): Promise<void> => {
    const record = await this._getAccount(account)
    if (record) {
      await this._table.update(record.id, token)
    } else {
      await this._table.insert({
        integration: this._name,
        account,
        ...token,
      })
    }
  }

  private _getAccount = async (account: string): Promise<Record<OAuthAccount> | undefined> => {
    const record = await this._table.read<OAuthAccount>(
      new AndFilter([
        new IsTextFilter('integration', this._name),
        new IsTextFilter('account', account),
      ])
    )
    return record
  }
}
