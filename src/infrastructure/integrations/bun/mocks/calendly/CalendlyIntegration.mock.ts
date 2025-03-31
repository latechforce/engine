import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import { Database } from 'bun:sqlite'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'

export class CalendlyIntegration implements ICalendlyIntegration {
  private db: Database

  constructor(private _config?: CalendlyConfig) {
    this.db = new Database(_config?.accessToken ?? ':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY)`)
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db
      .query<CalendlyConfig, string>('SELECT * FROM users WHERE id = ?')
      .get(this._config?.accessToken ?? '')
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return undefined
  }
}
