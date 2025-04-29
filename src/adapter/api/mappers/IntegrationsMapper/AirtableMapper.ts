import type { AirtableIntegrationSchema } from '../../schemas/IntegrationSchema/AirtableSchema'
import type { Integrations } from '../../../spi/integrations'
import { AirtableSpi } from '../../../spi/integrations/AirtableSpi'
import { Airtable } from '../../../../domain/integrations/Airtable'
import type { BaseServices } from '../../../../domain/integrations/base'

export class AirtableMapper {
  static toIntegration(
    integrations: Integrations,
    services: BaseServices,
    schemas: AirtableIntegrationSchema[] = []
  ): Airtable {
    const spis = schemas.map((schema) => {
      const driver = integrations.airtable(schema)
      return new AirtableSpi(driver)
    })
    return new Airtable(spis, services)
  }
}
