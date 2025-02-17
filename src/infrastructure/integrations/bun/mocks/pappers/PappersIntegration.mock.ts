import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import type { PappersConfig, PappersEntreprise } from '/domain/integrations/Pappers'
import { Database } from 'bun:sqlite'

export class PappersIntegration implements IPappersIntegration {
  private db: Database

  constructor(private _config?: PappersConfig) {
    this.db = new Database(_config?.apiKey ?? ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS companies (
        siret TEXT PRIMARY KEY,
        data TEXT NOT NULL
      )
    `)
  }

  getConfig = (): PappersConfig => {
    if (!this._config) {
      throw new Error('Pappers config not set')
    }
    return this._config
  }

  getCompany = async (siret: string): Promise<PappersEntreprise | undefined> => {
    const result = this.db
      .query<{ data: string }, [string]>('SELECT data FROM companies WHERE siret = ?')
      .get(siret)
    if (!result) {
      return undefined
    }
    const companyData: PappersEntreprise = JSON.parse(result.data)
    return companyData
  }

  addCompany = async (company: PappersEntreprise): Promise<void> => {
    const data = JSON.stringify(company)
    this.db.run(
      `
      INSERT OR REPLACE INTO companies (siret, data)
      VALUES (?, ?)
    `,
      [company.siege.siret, data]
    )
  }
}
