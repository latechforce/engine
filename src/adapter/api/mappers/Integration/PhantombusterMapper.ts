import type { Integrations } from '/adapter/spi/integrations'
import { PhantombusterSpi } from '/adapter/spi/integrations/PhantombusterSpi'
import { Phantombuster, type PhantombusterConfig } from '/domain/integrations/Phantombuster'

export class PhantombusterMapper {
  static toIntegration(integrations: Integrations, config?: PhantombusterConfig): Phantombuster {
    const driver = integrations.phantombuster(config)
    const spi = new PhantombusterSpi(driver)
    return new Phantombuster(spi)
  }
}
