import type { IPappersSpi } from '/domain/integrations/Pappers/IPappersSpi'
import { BaseSpi } from './base'

export type IPappersIntegration = IPappersSpi

export class PappersSpi extends BaseSpi<IPappersSpi> implements IPappersSpi {
  constructor(integration: IPappersIntegration) {
    super(integration)
  }

  getCompany = async (siret: string) => {
    return this._integration.getCompany(siret)
  }
}
