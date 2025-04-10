import type { Integrations } from '/adapter/spi/integrations'
import { NotionSpi } from '/adapter/spi/integrations/NotionSpi'
import { Notion, type NotionConfig, type NotionServices } from '/domain/integrations/Notion'

export class NotionMapper {
  static toIntegration(
    integrations: Integrations,
    services: NotionServices,
    configs: NotionConfig[] = []
  ): Notion {
    const spis = configs.map((config) => {
      const driver = integrations.notion(config)
      return new NotionSpi(driver)
    })
    return new Notion(spis, services)
  }
}
