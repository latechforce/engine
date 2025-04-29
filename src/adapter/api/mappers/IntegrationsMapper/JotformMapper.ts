import type { Integrations } from '../../../spi/integrations'
import { JotformSpi } from '../../../spi/integrations/JotformSpi'
import { Jotform } from '../../../../domain/integrations/Jotform'
import type { JotformIntegrationSchema } from '../../schemas/IntegrationSchema/JotformSchema'
import type { BaseServices } from '../../../../domain/integrations/base'

export class JotformMapper {
  static toIntegration(
    integrations: Integrations,
    services: BaseServices,
    schemas: JotformIntegrationSchema[] = []
  ): Jotform {
    const spis = schemas.map((schema) => {
      const driver = integrations.jotform(schema)
      return new JotformSpi(driver)
    })
    return new Jotform(spis, services)
  }
}
