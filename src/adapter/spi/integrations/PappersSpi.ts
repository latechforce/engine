import type { IPappersSpi } from '/domain/integrations/Pappers/IPappersSpi'
import { BaseSpi } from './base'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'

export type IPappersIntegration = IPappersSpi

export class PappersSpi extends BaseSpi<PappersConfig, IPappersIntegration> implements IPappersSpi {
  constructor(integration: IPappersIntegration) {
    super(integration)
  }

  getCompany = async (siret: string) => {
    return this._integration.getCompany(siret)
  }
}
