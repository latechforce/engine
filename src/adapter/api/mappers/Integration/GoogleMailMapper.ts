import type { Integrations } from '/adapter/spi/integrations'
import { GoogleMailSpi } from '/adapter/spi/integrations/GoogleMailSpi'
import { GoogleMail } from '/domain/integrations/Google/Mail'
import type { GoogleMailConfig } from '/domain/integrations/Google/Mail/GoogleMailConfig'

export class GoogleMailMapper {
  static toIntegration(integrations: Integrations, configs: GoogleMailConfig[] = []): GoogleMail {
    const spis = configs.map((config) => {
      const driver = integrations.googleMail(config)
      return new GoogleMailSpi(driver)
    })
    return new GoogleMail(spis)
  }
}
