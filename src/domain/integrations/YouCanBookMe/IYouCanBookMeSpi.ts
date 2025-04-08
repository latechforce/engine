import type { BaseSpi } from '../base'
import type { IntegrationResponse } from '../base'
import type { YouCanBookMeProfile } from './YouCanBookMeTypes'
import type { YouCanBookMeConfig } from './YouCanBookMeConfig'

export interface IYouCanBookMeSpi extends BaseSpi<YouCanBookMeConfig> {
  currentProfile: () => Promise<IntegrationResponse<YouCanBookMeProfile>>
  getProfile: (profileId: string) => Promise<IntegrationResponse<YouCanBookMeProfile>>
  updateProfile: (
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ) => Promise<IntegrationResponse<YouCanBookMeProfile>>
}
