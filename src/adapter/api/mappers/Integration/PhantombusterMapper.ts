import type { PhantombusterIntegrationSchema } from '../../schemas/IntegrationSchema/PhantombusterSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { PhantombusterSpi } from '/adapter/spi/integrations/PhantombusterSpi'
import { Phantombuster } from '/domain/integrations/Phantombuster'

export class PhantombusterMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: PhantombusterIntegrationSchema[] = []
  ): Phantombuster {
    const spis = schemas.map((schema) => {
      const driver = integrations.phantombuster(schema)
      return new PhantombusterSpi(driver)
    })
    return new Phantombuster(spis)
  }
}
