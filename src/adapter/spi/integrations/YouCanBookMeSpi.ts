import { BaseSpi } from './base'
import type { IYouCanBookMeSpi } from '/domain/integrations/YouCanBookMe/IYouCanBookMeSpi'

export type IYouCanBookMeIntegration = IYouCanBookMeSpi

export class YouCanBookMeSpi extends BaseSpi<IYouCanBookMeIntegration> implements IYouCanBookMeSpi {
  constructor(integration: IYouCanBookMeIntegration) {
    super(integration)
  }
}
