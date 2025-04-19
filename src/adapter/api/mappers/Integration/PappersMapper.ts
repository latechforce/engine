import type { PappersIntegrationSchema } from '../../schemas/IntegrationSchema/PappersSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { PappersSpi } from '/adapter/spi/integrations/PappersSpi'
import { Pappers } from '/domain/integrations/Pappers'
import type { BaseServices } from '/domain/integrations/base'

export class PappersMapper {
  static toIntegration(
    integrations: Integrations,
    services: BaseServices,
    schemas: PappersIntegrationSchema[] = []
  ): Pappers {
    const spis = schemas.map((schema) => {
      const driver = integrations.pappers(schema)
      return new PappersSpi(driver)
    })
    return new Pappers(spis, services)
  }
}
