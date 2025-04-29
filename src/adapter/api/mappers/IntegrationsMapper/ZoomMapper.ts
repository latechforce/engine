import type { Integrations } from '/adapter/spi/integrations'
import { ZoomSpi } from '/adapter/spi/integrations/ZoomSpi'
import { Zoom } from '/domain/integrations/Zoom'
import type { ZoomIntegrationSchema } from '../../schemas/IntegrationSchema/ZoomSchema'
import type { OAuthService } from '/domain/integrations/OAuth'

export class ZoomMapper {
  static toIntegration(
    integrations: Integrations,
    services: OAuthService,
    schemas: ZoomIntegrationSchema[] = []
  ): Zoom {
    const spis = schemas.map((schema) => {
      const driver = integrations.zoom(schema)
      return new ZoomSpi(driver)
    })
    return new Zoom(spis, services)
  }
}
