import { BaseSpi } from './base'
import type { IYouCanBookMeSpi } from '/domain/integrations/YouCanBookMe/IYouCanBookMeSpi'
import type { Profile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export type IYouCanBookMeIntegration = IYouCanBookMeSpi

export class YouCanBookMeSpi extends BaseSpi<IYouCanBookMeIntegration> implements IYouCanBookMeSpi {
  constructor(integration: IYouCanBookMeIntegration) {
    super(integration)
  }

  getProfile = async (profileId: string) => {
    return this._integration.getProfile(profileId)
  }

  updateProfile = async (profileId: string, profile: Partial<Profile>) => {
    return this._integration.updateProfile(profileId, profile)
  }
}
