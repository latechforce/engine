import type { Integrations } from '/adapter/spi/integrations'
import { GoogleMailSpi } from '/adapter/spi/integrations/GoogleMailSpi'
import { GoogleMail } from '/domain/integrations/Google/Mail'
import type { MailGoogleIntegrationSchema } from '../../schemas/IntegrationSchema/Google/MailSchema'

export class GoogleMailMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: MailGoogleIntegrationSchema[] = []
  ): GoogleMail {
    const spis = schemas.map((schema) => {
      const driver = integrations.googleMail(schema)
      return new GoogleMailSpi(driver)
    })
    return new GoogleMail(spis)
  }
}
