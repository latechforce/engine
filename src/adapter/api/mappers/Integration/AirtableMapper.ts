import type { Integrations } from '/adapter/spi/integrations'
import { AirtableSpi } from '/adapter/spi/integrations/AirtableSpi'
import { Airtable, type AirtableConfig } from '/domain/integrations/Airtable'

export class AirtableMapper {
  static toIntegration(integrations: Integrations, configs: AirtableConfig[] = []): Airtable {
    const spis = configs.map((config) => {
      const driver = integrations.airtable(config)
      return new AirtableSpi(driver)
    })
    return new Airtable(spis)
  }
}
