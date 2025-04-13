import type { ActionSchema } from '../schemas/AutomationSchema/ActionSchema'
import { CreatePaymentGoCardlessAction } from '/domain/entities/Action/integrations/gocardless/CreatePayment'
import { ListPaymentsGoCardlessAction } from '/domain/entities/Action/integrations/gocardless/ListPayments'
import { SendEmailGoogleMailAction } from '/domain/entities/Action/integrations/googleMail/SendEmail'
import { UpdatePageNotionAction } from '/domain/entities/Action/integrations/notion/UpdatePage'
import { GetCompanyPappersAction } from '/domain/entities/Action/integrations/pappers/GetCompany'
import { CreateClientQontoAction } from '/domain/entities/Action/integrations/qonto/CreateClient'
import { RetrieveAttachmentQontoAction } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'
import { CreateRecordDatabaseAction } from '/domain/entities/Action/services/database/CreateRecord'
import { RunTypescriptCodeAction } from '/domain/entities/Action/services/code/RunTypescript'
import { ReadRecordDatabaseAction } from '/domain/entities/Action/services/database/ReadRecord'
import { RunJavascriptCodeAction } from '/domain/entities/Action/services/code/RunJavascript'
import type { TemplateCompiler, Logger, Monitor, CodeCompiler, IdGenerator } from '/domain/services'
import type { Pappers, Qonto, Notion, GoogleMail, GoCardless } from '/domain/integrations'
import type { Table } from '/domain/entities/Table'
import type { Action } from '/domain/entities/Action'

export type ActionMapperServices = {
  templateCompiler: TemplateCompiler
  logger: Logger
  monitor: Monitor
  idGenerator: IdGenerator
  javascriptCompiler: CodeCompiler
  typescriptCompiler: CodeCompiler
}

export type ActionMapperEntities = {
  tables: Table[]
}

export type ActionMapperIntegrations = {
  pappers: Pappers
  qonto: Qonto
  notion: Notion
  googleMail: GoogleMail
  gocardless: GoCardless
}

export class ActionMapper {
  static toEntity(
    schema: ActionSchema,
    services: ActionMapperServices,
    entities: ActionMapperEntities,
    integrations: ActionMapperIntegrations
  ): Action {
    if ('integration' in schema) {
      switch (schema.integration) {
        case 'Pappers':
          switch (schema.action) {
            case 'GetCompany':
              return new GetCompanyPappersAction(schema, services, integrations)
          }
          break
        case 'Qonto':
          switch (schema.action) {
            case 'CreateClient':
              return new CreateClientQontoAction(schema, services, integrations)
            case 'RetrieveAttachment':
              return new RetrieveAttachmentQontoAction(schema, services, integrations)
          }
          break
        case 'Notion':
          switch (schema.action) {
            case 'UpdatePage':
              return new UpdatePageNotionAction(schema, services, integrations)
          }
          break
        case 'GoogleMail':
          switch (schema.action) {
            case 'SendEmail':
              return new SendEmailGoogleMailAction(schema, services, integrations)
          }
          break
        case 'GoCardless':
          switch (schema.action) {
            case 'CreatePayment':
              return new CreatePaymentGoCardlessAction(schema, services, integrations)
            case 'ListPayments':
              return new ListPaymentsGoCardlessAction(schema, services, integrations)
          }
          break
      }
    } else {
      switch (schema.service) {
        case 'Code':
          switch (schema.action) {
            case 'RunJavascript':
              return new RunJavascriptCodeAction(schema, services)
            case 'RunTypescript':
              return new RunTypescriptCodeAction(schema, services)
          }
          break
        case 'Database':
          switch (schema.action) {
            case 'CreateRecord':
              return new CreateRecordDatabaseAction(schema, services, entities)
            case 'ReadRecord':
              return new ReadRecordDatabaseAction(schema, services, entities)
          }
      }
    }
  }

  static toManyEntities(
    schemas: ActionSchema[],
    services: ActionMapperServices,
    entities: ActionMapperEntities,
    integrations: ActionMapperIntegrations
  ): Action[] {
    return schemas.map((schema) => this.toEntity(schema, services, entities, integrations))
  }
}
