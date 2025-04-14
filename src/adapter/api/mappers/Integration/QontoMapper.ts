import type { QontoIntegrationSchema } from '../../schemas/IntegrationSchema/QontoSchema'
import type { Integrations } from '/adapter/spi/integrations'
import { QontoSpi } from '/adapter/spi/integrations/QontoSpi'
import { Qonto } from '/domain/integrations/Qonto'

export class QontoMapper {
  static toIntegration(integrations: Integrations, schemas: QontoIntegrationSchema[] = []): Qonto {
    const spis = schemas.map((schema) => {
      const driver = integrations.qonto(schema)
      return new QontoSpi(driver)
    })
    return new Qonto(spis)
  }
}
