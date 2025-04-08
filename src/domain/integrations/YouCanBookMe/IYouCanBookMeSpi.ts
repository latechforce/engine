import type { BaseSpi } from '../base'
import type { IntegrationResponse } from '../base'
import type { Profile } from './YouCanBookMeTypes'

export interface IYouCanBookMeSpi extends BaseSpi {
  getProfile: (profileId: string) => Promise<IntegrationResponse<Profile>>
  updateProfile: (
    profileId: string,
    profile: Partial<Profile>
  ) => Promise<IntegrationResponse<Profile>>
}
