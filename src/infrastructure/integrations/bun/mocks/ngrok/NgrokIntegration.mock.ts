import type { INgrokIntegration } from '/adapter/spi/integrations/NgrokSpi'
import type { NgrokConfig } from '/domain/integrations/Ngrok'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'

export class NgrokIntegration extends BaseMockIntegration implements INgrokIntegration {
  private _configs: SQLiteDatabaseTableDriver

  constructor(public config: NgrokConfig) {
    super(config, config.authToken)
    this._configs = this._db.table({
      name: 'configs',
      fields: [
        { name: 'key', type: 'SingleLineText' },
        { name: 'value', type: 'SingleLineText' },
      ],
    })
    this._configs.ensureSync()
  }

  start = async (port: number): Promise<string> => {
    const url = `http://localhost:${port}`
    this._configs.insert({
      id: 'lastStartedUrl',
      created_at: new Date().toISOString(),
      fields: {
        key: 'lastStartedUrl',
        value: url,
      },
    })
    return url
  }

  stop = async (): Promise<void> => {
    this._configs.delete('lastStartedUrl')
  }
}
