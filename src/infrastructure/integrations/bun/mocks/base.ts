import { nanoid } from 'nanoid'
import type { BaseConfig, IntegrationResponseError } from '/domain/integrations/base'
import { SQLiteDatabaseDriver } from '../../../drivers/bun/DatabaseDriver/SQLite/SQLiteDriver'
import { SQLiteDatabaseTableDriver } from '../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'

export class BaseMockIntegration {
  protected _db: SQLiteDatabaseDriver
  protected _tokens: SQLiteDatabaseTableDriver

  constructor(
    config: BaseConfig,
    private _token: string
  ) {
    this._db = new SQLiteDatabaseDriver({
      url: config.baseUrl ?? ':memory:',
      type: 'SQLite',
    })
    this._db.connectSync()
    this._tokens = this._db.table({
      name: 'tokens',
      fields: [
        {
          name: 'token',
          type: 'SingleLineText',
        },
      ],
    })
    this._tokens.ensureSync()
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    const token = await this._tokens.read({
      field: 'token',
      operator: 'Is',
      value: this._token,
    })
    if (!token) {
      return {
        error: {
          status: 401,
          message: 'Test connection failed',
        },
      }
    }
  }

  createToken = async (token: string) => {
    await this._tokens.insert({
      id: nanoid(),
      fields: {
        token,
      },
      created_at: new Date().toISOString(),
    })
  }
}
