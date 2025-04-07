import type { IYouCanBookMeSpi } from './IYouCanBookMeSpi'
import { Integration } from '../base'
import type { IntegrationResponse } from '../base'
import type { Profile } from './YouCanBookMeTypes'

export class YouCanBookMe extends Integration<IYouCanBookMeSpi> {
  constructor(spi: IYouCanBookMeSpi) {
    super(spi)
  }

  getProfile = async (profileId: string): Promise<Profile> => {
    const response = await this._spi.getProfile(profileId)
    if (response.error) return this._throwError('getProfile', response.error)
    return response.data
  }

  updateProfile = async (profileId: string, profile: Partial<Profile>): Promise<Profile> => {
    const response = await this._spi.updateProfile(profileId, profile)
    if (response.error) return this._throwError('updateProfile', response.error)
    return response.data
  }
}
