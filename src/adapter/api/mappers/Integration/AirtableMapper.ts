import type { Integrations } from '/adapter/spi/integrations'
import { AirtableSpi } from '/adapter/spi/integrations/AirtableSpi'
import { Airtable, type AirtableConfig } from '/domain/integrations/Airtable'

export class AirtableMapper {
  static toIntegration(integrations: Integrations, config?: AirtableConfig): Airtable {
    const driver = integrations.airtable(config)
    const spi = new AirtableSpi(driver)
    return new Airtable(spi)
  }
}
