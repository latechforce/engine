import type { Integrations } from '/adapter/spi/integrations'
import { YouCanBookMeSpi } from '/adapter/spi/integrations/YouCanBookMeSpi'
import { YouCanBookMe } from '/domain/integrations/YouCanBookMe'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'

export class YouCanBookMeMapper {
  static toIntegration(integrations: Integrations, config?: YouCanBookMeConfig): YouCanBookMe {
    const driver = integrations.youCanBookMe(config)
    const spi = new YouCanBookMeSpi(driver)
    return new YouCanBookMe(spi)
  }
}
