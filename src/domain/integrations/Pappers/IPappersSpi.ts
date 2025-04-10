import type { IntegrationResponse, BaseSpi } from '../base'
import type { PappersEntreprise } from './PappersTypes'
import type { PappersConfig } from './PappersConfig'

export interface IPappersSpi extends BaseSpi<PappersConfig> {
  getCompany: (siret: string) => Promise<IntegrationResponse<PappersEntreprise>>
}
