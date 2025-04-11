import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'
import type { PappersEntreprise } from '/domain/integrations/Pappers/PappersTypes'
import type { IntegrationResponse } from '/domain/integrations/base'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'

export class PappersIntegration extends BaseMockIntegration implements IPappersIntegration {
  private _companies: SQLiteDatabaseTableDriver

  constructor(public config: PappersConfig) {
    super(config, config.apiKey)
    this._companies = this._db.table({
      name: 'companies',
      fields: [
        { name: 'siret', type: 'SingleLineText' },
        { name: 'data', type: 'SingleLineText' },
      ],
    })
    this._companies.ensureSync()
  }

  getCompany = async (siret: string): Promise<IntegrationResponse<PappersEntreprise>> => {
    const result = await this._companies.read({
      field: 'siret',
      operator: 'Is',
      value: siret,
    })
    if (!result) {
      return {
        error: {
          status: 404,
          message: 'Company not found',
        },
      }
    }
    const companyData: PappersEntreprise = JSON.parse(result.fields.data as string)
    return { data: companyData }
  }

  addCompany = async (company: PappersEntreprise): Promise<void> => {
    await this._companies.insert({
      id: company.siege.siret,
      created_at: new Date().toISOString(),
      fields: {
        siret: company.siege.siret,
        data: JSON.stringify(company),
      },
    })
  }
}
