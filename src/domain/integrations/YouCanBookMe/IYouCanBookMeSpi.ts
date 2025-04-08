import type { BaseSpi } from '../base'
import type { IntegrationResponse } from '../base'
import type { YouCanBookMeProfile } from './YouCanBookMeTypes'

export interface IYouCanBookMeSpi extends BaseSpi {
  getProfile: (profileId: string) => Promise<IntegrationResponse<YouCanBookMeProfile>>
  updateProfile: (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ) => Promise<IntegrationResponse<YouCanBookMeProfile>>
}
