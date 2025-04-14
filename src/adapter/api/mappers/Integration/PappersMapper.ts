import type { PappersIntegrationSchema } from '../../schemas/IntegrationSchema/PappersSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { PappersSpi } from '/adapter/spi/integrations/PappersSpi'
import { Pappers } from '/domain/integrations/Pappers'

export class PappersMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: PappersIntegrationSchema[] = []
  ): Pappers {
    const spis = schemas.map((schema) => {
      const driver = integrations.pappers(schema)
      return new PappersSpi(driver)
    })
    return new Pappers(spis)
  }
}
