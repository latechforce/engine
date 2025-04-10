import type { PappersEntreprise } from './PappersTypes'

export interface PappersCodeRunner {
  getCompany: (account: string, siret: string) => Promise<PappersEntreprise | undefined>
}
