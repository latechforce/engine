import { Integration, type BaseServices } from '../base'
import type { IPappersSpi } from './IPappersSpi'
import type { PappersEntreprise } from './PappersTypes'
import type { PappersConfig } from './PappersConfig'
import type { PappersCodeRunner } from './PappersCodeRunner'

export class Pappers extends Integration<PappersConfig, IPappersSpi> {
  constructor(spis: IPappersSpi[], services: BaseServices) {
    super('pappers', spis, services)
  }

  get codeRunnerIntegration(): PappersCodeRunner {
    return {
      getCompany: this.getCompany,
    }
  }

  getCompany = async (account: string, siret: string): Promise<PappersEntreprise | undefined> => {
    const response = await this._spi(account).getCompany(siret)
    if (response.error) return Integration.throwError('getCompany', response.error)
    return response.data
  }
}
