import type { Integrations } from '/adapter/spi/integrations'
import { NotionSpi } from '/adapter/spi/integrations/NotionSpi'
import { Notion, type NotionServices } from '/domain/integrations/Notion'
import type { NotionIntegrationSchema } from '../../schemas/IntegrationSchema/NotionSchema'

export class NotionMapper {
  static toIntegration(
    integrations: Integrations,
    services: NotionServices,
    schemas: NotionIntegrationSchema[] = []
  ): Notion {
    const spis = schemas.map((schema) => {
      const driver = integrations.notion(schema)
      return new NotionSpi(driver)
    })
    return new Notion(spis, services)
  }
}
