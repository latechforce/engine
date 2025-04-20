import { AirtableMapper } from './AirtableMapper'
import { CalendlyMapper } from './CalendlyMapper'
import { NotionMapper } from './NotionMapper'
import type { Integrations } from '/domain/integrations'
import type { Integrations as IntegrationsSpi } from '/adapter/spi/integrations'
import type { Server } from '/domain/services/Server'
import type { Logger } from '/domain/services/Logger'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { Storage } from '/domain/services/Storage'
import type { IntegrationSchema } from '../../schemas/IntegrationSchema'
import { PappersMapper } from './PappersMapper'
import { QontoMapper } from './QontoMapper'
import { JotformMapper } from './JotformMapper'
import { PhantombusterMapper } from './PhantombusterMapper'
import { YouCanBookMeMapper } from './YouCanBookMeMapper'
import { GoogleMailMapper } from './GoogleMailMapper'
import { GoCardlessMapper } from './GoCardlessMapper'
import type { Fetcher } from '/domain/services/Fetcher'
import type { System } from '/domain/services/System'
import type { SchemaValidator } from '/domain/services/SchemaValidator'

interface IntegrationsServices {
  idGenerator: IdGenerator
  logger: Logger
  storage: Storage
  server: Server
  templateCompiler: TemplateCompiler
  fetcher: Fetcher
  system: System
  schemaValidator: SchemaValidator
}

export class IntegrationsMapper {
  static toEntities(
    integrations: IntegrationsSpi,
    services: IntegrationsServices,
    schema?: IntegrationSchema
  ): Integrations {
    const {
      idGenerator,
      logger,
      storage,
      server,
      templateCompiler,
      fetcher,
      system,
      schemaValidator,
    } = services
    const notion = NotionMapper.toIntegration(
      integrations,
      { idGenerator, logger, storage, server, templateCompiler, fetcher, system, schemaValidator },
      schema?.notion
    )
    const calendly = CalendlyMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.calendly
    )
    const airtable = AirtableMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.airtable
    )
    const pappers = PappersMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.pappers
    )
    const qonto = QontoMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.qonto
    )
    const jotform = JotformMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.jotform
    )
    const youcanbookme = YouCanBookMeMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.youcanbookme
    )
    const phantombuster = PhantombusterMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.phantombuster
    )
    const googleMail = GoogleMailMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.google?.mail
    )
    const gocardless = GoCardlessMapper.toIntegration(
      integrations,
      { server, schemaValidator },
      schema?.gocardless
    )
    return {
      notion,
      calendly,
      airtable,
      pappers,
      qonto,
      jotform,
      youcanbookme,
      phantombuster,
      googleMail,
      gocardless,
    }
  }
}
