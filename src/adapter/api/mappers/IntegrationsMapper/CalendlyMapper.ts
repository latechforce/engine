import type { CalendlyIntegrationSchema } from '../../schemas/IntegrationSchema/CalendlySchema'
import type { Integrations } from '../../../spi/integrations'
import { CalendlySpi } from '../../../spi/integrations/CalendlySpi'
import { Calendly } from '../../../../domain/integrations/Calendly'
import type { OAuthService } from '../../../../domain/integrations/OAuth'

export class CalendlyMapper {
  static toIntegration(
    integrations: Integrations,
    services: OAuthService,
    schemas: CalendlyIntegrationSchema[] = []
  ): Calendly {
    const spis = schemas.map((schema) => {
      const driver = integrations.calendly(schema)
      return new CalendlySpi(driver)
    })
    return new Calendly(spis, services)
  }
}
