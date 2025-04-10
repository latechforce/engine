import type { Integrations } from '/adapter/spi/integrations'
import { PappersSpi } from '/adapter/spi/integrations/PappersSpi'
import { Pappers } from '/domain/integrations/Pappers'
import type { PappersConfig } from '/domain/integrations/Pappers/PappersConfig'

export class PappersMapper {
  static toIntegration(integrations: Integrations, configs: PappersConfig[] = []): Pappers {
    const spis = configs.map((config) => {
      const driver = integrations.pappers(config)
      return new PappersSpi(driver)
    })
    return new Pappers(spis)
  }
}
