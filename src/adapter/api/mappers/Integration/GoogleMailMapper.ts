import type { Integrations } from '/adapter/spi/integrations'
import { GoogleMailSpi } from '/adapter/spi/integrations/GoogleMailSpi'
import { GoogleMail, type GoogleMailConfig } from '/domain/integrations/Google/GoogleMail'

export class GoogleMailMapper {
  static toIntegration(integrations: Integrations, config?: GoogleMailConfig): GoogleMail {
    const driver = integrations.googleMail(config)
    const spi = new GoogleMailSpi(driver)
    return new GoogleMail(spi)
  }
}
