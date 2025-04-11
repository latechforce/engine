import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import { Database } from 'bun:sqlite'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { IntegrationResponse } from '/domain/integrations/base'

export class PappersIntegration implements IPappersIntegration {
  private db: Database

  constructor(public config: PappersConfig) {
    this.db = new Database(config.baseUrl ?? ':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY)`)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS companies (
        siret TEXT PRIMARY KEY,
        data TEXT NOT NULL
      )
    `)
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db.query('SELECT * FROM users WHERE id = ?').get(this.config.apiKey ?? '')
    if (!user) {
      return { error: { status: 404 } }
    }
    return undefined
  }

  createUser = async (id: string): Promise<void> => {
    this.db.run(`INSERT INTO users (id) VALUES (?)`, [id])
  }

  getCompany = async (siret: string): Promise<IntegrationResponse<PappersEntreprise>> => {
    const result = this.db
      .query<{ data: string }, [string]>('SELECT data FROM companies WHERE siret = ?')
      .get(siret)
    if (!result) {
      return {
        error: {
          status: 404,
        },
      }
    }
    const companyData: PappersEntreprise = JSON.parse(result.data)
    return { data: companyData }
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
