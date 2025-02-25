import type { Integrations } from '/adapter/spi/integrations'
import { GoCardlessSpi } from '/adapter/spi/integrations/GoCardlessSpi'
import { GoCardless, type GoCardlessConfig } from '/domain/integrations/GoCardless'

export class GoCardlessMapper {
  static toIntegration(integrations: Integrations, config?: GoCardlessConfig): GoCardless {
    const driver = integrations.gocardless(config)
    const spi = new GoCardlessSpi(driver)
    return new GoCardless(spi)
  }
}
