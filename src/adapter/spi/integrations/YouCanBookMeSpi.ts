import { BaseSpi } from './base'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe'
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

  getProfile = async (profileId: string) => {
    return this._integration.getProfile(profileId)
  }

  updateProfile = async (profileId: string, profile: Partial<YouCanBookMeProfile>) => {
    return this._integration.updateProfile(profileId, profile)
  }
}
