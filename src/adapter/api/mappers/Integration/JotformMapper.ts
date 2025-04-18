import type { Integrations } from '/adapter/spi/integrations'
import { JotformSpi } from '/adapter/spi/integrations/JotformSpi'
import { Jotform } from '/domain/integrations/Jotform'
import type { JotformIntegrationSchema } from '../../schemas/IntegrationSchema/JotformSchema'

export class JotformMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: JotformIntegrationSchema[] = []
  ): Jotform {
    const spis = schemas.map((schema) => {
      const driver = integrations.jotform(schema)
      return new JotformSpi(driver)
    })
    return new Jotform(spis)
  }
}
