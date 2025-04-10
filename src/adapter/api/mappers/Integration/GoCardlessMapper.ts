import type { Integrations } from '/adapter/spi/integrations'
import { GoCardlessSpi } from '/adapter/spi/integrations/GoCardlessSpi'
import { GoCardless, type GoCardlessConfig } from '/domain/integrations/GoCardless'

export class GoCardlessMapper {
  static toIntegration(integrations: Integrations, configs: GoCardlessConfig[] = []): GoCardless {
    const spis = configs.map((config) => {
      const driver = integrations.gocardless(config)
      return new GoCardlessSpi(driver)
    })
    return new GoCardless(spis)
  }
}
