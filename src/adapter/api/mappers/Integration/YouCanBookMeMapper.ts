import type { YouCanBookMeIntegrationSchema } from '../../schemas/IntegrationSchema/YouCanBookMeSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { YouCanBookMeSpi } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type { BaseServices } from '/domain/integrations/base'
import { YouCanBookMe } from '/domain/integrations/YouCanBookMe'

export class YouCanBookMeMapper {
  static toIntegration(
    integrations: Integrations,
    services: BaseServices,
    schemas: YouCanBookMeIntegrationSchema[] = []
  ): YouCanBookMe {
    const spis = schemas.map((schema) => {
      const driver = integrations.youCanBookMe(schema)
      return new YouCanBookMeSpi(driver)
    })
    return new YouCanBookMe(spis, services)
  }
}
