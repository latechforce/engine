import type { AirtableIntegrationSchema } from '../../schemas/IntegrationSchema/AirtableSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { AirtableSpi } from '/adapter/spi/integrations/AirtableSpi'
import { Airtable } from '/domain/integrations/Airtable'

export class AirtableMapper {
  static toIntegration(
    integrations: Integrations,
    schemas: AirtableIntegrationSchema[] = []
  ): Airtable {
    const spis = schemas.map((schema) => {
      const driver = integrations.airtable(schema)
      return new AirtableSpi(driver)
    })
    return new Airtable(spis)
  }
}
