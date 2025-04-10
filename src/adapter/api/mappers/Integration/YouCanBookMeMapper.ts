import type { Integrations } from '/adapter/spi/integrations'
import { YouCanBookMeSpi } from '/adapter/spi/integrations/YouCanBookMeSpi'
import { YouCanBookMe } from '/domain/integrations/YouCanBookMe'
import type { YouCanBookMeConfig } from '/domain/integrations/YouCanBookMe/YouCanBookMeConfig'

export class YouCanBookMeMapper {
  static toIntegration(
    integrations: Integrations,
    configs: YouCanBookMeConfig[] = []
  ): YouCanBookMe {
    const spis = configs.map((config) => {
      const driver = integrations.youCanBookMe(config)
      return new YouCanBookMeSpi(driver)
    })
    return new YouCanBookMe(spis)
  }
}
