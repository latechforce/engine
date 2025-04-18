import type { IYouCanBookMeSpi } from './IYouCanBookMeSpi'
import { Integration } from '../base'
import type { YouCanBookMeProfile } from './YouCanBookMeTypes'
import type { YouCanBookMeConfig } from './YouCanBookMeConfig'

export class YouCanBookMe extends Integration<YouCanBookMeConfig, IYouCanBookMeSpi> {
  constructor(spis: IYouCanBookMeSpi[]) {
    super(spis)
  }

  currentProfile = async (account: string): Promise<YouCanBookMeProfile> => {
    const response = await this._spi(account).currentProfile()
    if (response.error) return Integration.throwError('currentProfile', response.error)
    return response.data
  }

  createProfile = async (
    account: string,
    profile: YouCanBookMeProfile
  ): Promise<YouCanBookMeProfile> => {
    const response = await this._spi(account).createProfile(profile)
    if (response.error) return Integration.throwError('createProfile', response.error)
    return response.data
  }

  getProfile = async (account: string, profileId: string): Promise<YouCanBookMeProfile> => {
    const response = await this._spi(account).getProfile(profileId)
    if (response.error) return Integration.throwError('getProfile', response.error)
    return response.data
  }

  updateProfile = async (
    account: string,
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<YouCanBookMeProfile> => {
    const response = await this._spi(account).updateProfile(profileId, profile)
    if (response.error) return Integration.throwError('updateProfile', response.error)
    return response.data
  }
}
