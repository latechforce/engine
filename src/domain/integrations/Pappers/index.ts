import { Integration } from '../base'
import type { IPappersSpi } from './IPappersSpi'
import type { PappersEntreprise } from './PappersTypes'

export interface PappersCodeRunnerIntegration {
  getCompany: (siret: string) => Promise<PappersEntreprise | undefined>
}

export class Pappers extends Integration<IPappersSpi> {
  constructor(spi: IPappersSpi) {
    super(spi)
  }

  get codeRunnerIntegration(): PappersCodeRunnerIntegration {
    return {
      getCompany: this.getCompany,
    }
  }

  getCompany = async (siret: string): Promise<PappersEntreprise | undefined> => {
    const response = await this._spi.getCompany(siret)
    if (response.error) return this._throwError('getCompany', response.error)
    return response.data
  }
}
