import type { IYouCanBookMeSpi } from './IYouCanBookMeSpi'
import { Integration, type BaseServices, type IntegrationResponse } from '../base'
import type { YouCanBookMeProfile } from './YouCanBookMeTypes'
import type { YouCanBookMeConfig } from './YouCanBookMeConfig'

export class YouCanBookMe extends Integration<YouCanBookMeConfig, IYouCanBookMeSpi> {
  constructor(spis: IYouCanBookMeSpi[], services: BaseServices) {
    super('youcanbookme', spis, services)
  }

  currentProfile = async (account: string): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const response = await this._spi(account).currentProfile(account)
    if (response.error) return Integration.throwError('currentProfile', response.error)
    return { data: response.data }
  }

  createProfile = async (
    account: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const response = await this._spi(account).createProfile(account, profile)
    if (response.error) return Integration.throwError('createProfile', response.error)
    return { data: response.data }
  }

  getProfile = async (
    account: string,
    profileId: string
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const response = await this._spi(account).getProfile(account, profileId)
    if (response.error) return Integration.throwError('getProfile', response.error)
    return { data: response.data }
  }

  updateProfile = async (
    account: string,
    profileId: string,
    profile: Partial<YouCanBookMeProfile>
  ): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    const response = await this._spi(account).updateProfile(account, profileId, profile)
    if (response.error) return Integration.throwError('updateProfile', response.error)
    return { data: response.data }
  }
}
