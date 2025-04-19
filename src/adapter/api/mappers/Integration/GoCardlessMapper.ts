import type { GoCardlessIntegrationSchema } from '../../schemas/IntegrationSchema/GoCardlessSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { GoCardlessSpi } from '/adapter/spi/integrations/GoCardlessSpi'
import { GoCardless } from '/domain/integrations/GoCardless'
import type { BaseServices } from '/domain/integrations/base'
export class GoCardlessMapper {
  static toIntegration(
    integrations: Integrations,
    services: BaseServices,
    schemas: GoCardlessIntegrationSchema[] = []
  ): GoCardless {
    const spis = schemas.map((schema) => {
      const driver = integrations.gocardless(schema)
      return new GoCardlessSpi(driver)
    })
    return new GoCardless(spis, services)
  }
}
