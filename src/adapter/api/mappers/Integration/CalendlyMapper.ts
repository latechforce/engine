import type { CalendlyIntegrationSchema } from '../../schemas/IntegrationSchema/CalendlySchema'
import type { Integrations } from '/adapter/spi/integrations'
import { CalendlySpi } from '/adapter/spi/integrations/CalendlySpi'
import { Calendly } from '/domain/integrations/Calendly'

export class CalendlyMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: CalendlyIntegrationSchema[] = []
  ): Calendly {
    const spis = schemas.map((schema) => {
      const driver = integrations.calendly(schema)
      return new CalendlySpi(driver)
    })
    return new Calendly(spis)
  }
}
