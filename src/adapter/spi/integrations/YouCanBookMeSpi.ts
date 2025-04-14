import { BaseSpi } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { IYouCanBookMeSpi } from '/domain/integrations/YouCanBookMe/IYouCanBookMeSpi'
import type { YouCanBookMeProfile } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export type IYouCanBookMeIntegration = IYouCanBookMeSpi

export class YouCanBookMeSpi
  extends BaseSpi<YouCanBookMeConfig, IYouCanBookMeIntegration>
  implements IYouCanBookMeSpi
{
  constructor(integration: IYouCanBookMeIntegration) {
    super(integration)
  }

  currentProfile = async (): Promise<IntegrationResponse<YouCanBookMeProfile>> => {
    return this._integration.currentProfile()
  }

  getProfile = async (profileId: string) => {
    return this._integration.getProfile(profileId)
  }

  updateProfile = async (profileId: string, profile: Partial<YouCanBookMeProfile>) => {
    return this._integration.updateProfile(profileId, profile)
  }

  createProfile = async (profile: Partial<YouCanBookMeProfile>) => {
    return this._integration.createProfile(profile)
  }
}
