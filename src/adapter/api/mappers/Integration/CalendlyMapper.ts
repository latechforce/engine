import type { Integrations } from '/adapter/spi/integrations'
import { CalendlySpi } from '/adapter/spi/integrations/CalendlySpi'
import { Calendly } from '/domain/integrations/Calendly'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'

export class CalendlyMapper {
  static toIntegration(integrations: Integrations, config?: CalendlyConfig): Calendly {
    const driver = integrations.calendly(config)
    const spi = new CalendlySpi(driver)
    return new Calendly(spi)
  }
}
