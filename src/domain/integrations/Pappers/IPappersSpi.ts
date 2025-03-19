import type { IntegrationResponse, BaseSpi } from '../base'
import type { PappersEntreprise } from './PappersTypes'

export interface IPappersSpi extends BaseSpi {
  getCompany: (siret: string) => Promise<IntegrationResponse<PappersEntreprise>>
}
