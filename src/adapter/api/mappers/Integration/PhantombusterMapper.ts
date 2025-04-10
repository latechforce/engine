import type { Integrations } from '/adapter/spi/integrations'
import { PhantombusterSpi } from '/adapter/spi/integrations/PhantombusterSpi'
import { Phantombuster, type PhantombusterConfig } from '/domain/integrations/Phantombuster'

export class PhantombusterMapper {
  static toIntegration(
    integrations: Integrations,
    configs: PhantombusterConfig[] = []
  ): Phantombuster {
    const spis = configs.map((config) => {
      const driver = integrations.phantombuster(config)
      return new PhantombusterSpi(driver)
    })
    return new Phantombuster(spis)
  }
}
