import type { BaseSpi } from '../base'
import type { IntegrationResponse } from '../base'
import type { YouCanBookMeProfile } from './YouCanBookMeTypes'
import type { YouCanBookMeConfig } from './YouCanBookMeConfig'

export interface IYouCanBookMeSpi extends BaseSpi<YouCanBookMeConfig> {
  currentProfile: (account: string) => Promise<IntegrationResponse<YouCanBookMeProfile>>
  getProfile: (
    account: string,
    profileId: string
  ) => Promise<IntegrationResponse<YouCanBookMeProfile>>
  updateProfile: (
    account: string,
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ) => Promise<IntegrationResponse<YouCanBookMeProfile>>
  createProfile: (
    account: string,
    profile: Partial<YouCanBookMeProfile>
  ) => Promise<IntegrationResponse<YouCanBookMeProfile>>
}
