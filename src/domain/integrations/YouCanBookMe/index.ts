import type { IYouCanBookMeSpi } from './IYouCanBookMeSpi'
import { Integration } from '../base'
import type { IntegrationResponse, IntegrationResponseError } from '../base'
import type { Profile } from './YouCanBookMeTypes'

export class YouCanBookMe extends Integration<IYouCanBookMeSpi> {
  constructor(spi: IYouCanBookMeSpi) {
    super(spi)
  }

  getProfile = async (profileId: string): Promise<IntegrationResponse<Profile>> => {
    const response = await this._spi.getProfile(profileId)
    if (response.error) return this._throwError('getProfile', response.error)
    return response.data
  }
}
