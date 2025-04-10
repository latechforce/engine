import type { Action } from '/domain/entities/Action'
import {
  RunJavascriptCodeActionMapper,
  type RunJavascriptCodeActionMapperServices,
} from './services/code/RunJavascriptMapper'
import {
  RunTypescriptCodeActionMapper,
  type RunTypescriptCodeActionMapperServices,
} from './services/code/RunTypescriptMapper'
import {
  CreateRecordDatabaseActionMapper,
  type CreateRecordDatabaseActionMapperEntities,
  type CreateRecordDatabaseActionMapperServices,
} from './services/database/CreateRecordMapper'
import type { IAction } from '/domain/interfaces/IAction'
import { ReadRecordDatabaseActionMapper } from './services/database/ReadRecordMapper'
import {
  GetCompanyPappersActionMapper,
  type GetCompanyPappersActionMapperIntegrations,
} from './integrations/pappers/GetCompanyMapper'
import {
  CreateClientQontoActionMapper,
  type CreateClientQontoActionMapperIntegrations,
} from './integrations/qonto/CreateClientMapper'
import {
  UpdatePageNotionActionMapper,
  type UpdatePageNotionActionMapperIntegrations,
} from './integrations/notion/UpdatePage'
import { SendEmailGoogleMailActionMapper } from './integrations/googleMail/SendEmailMapper'
import type { SendEmailGoogleMailActionIntegrations } from '/domain/entities/Action/integrations/googleMail/SendEmail'
import {
  CreatePaymentGoCardlessActionMapper,
  type CreatePaymentGoCardlessActionMapperIntegrations,
} from './integrations/gocardless/CreatePaymentMapper'
import { ListPaymentsGoCardlessActionMapper } from './integrations/gocardless/ListPaymentsMapper'
import { RetrieveAttachmentQontoActionMapper } from './integrations/qonto/RetrieveAttachmentMapper'

export type ActionMapperServices = CreateRecordDatabaseActionMapperServices &
  RunJavascriptCodeActionMapperServices &
  RunTypescriptCodeActionMapperServices

export type ActionMapperEntities = CreateRecordDatabaseActionMapperEntities

export type ActionMapperIntegrations = GetCompanyPappersActionMapperIntegrations &
  CreateClientQontoActionMapperIntegrations &
  UpdatePageNotionActionMapperIntegrations &
  SendEmailGoogleMailActionIntegrations &
  CreatePaymentGoCardlessActionMapperIntegrations

export class ActionMapper {
  static toEntity(
    config: IAction,
    services: ActionMapperServices,
    entities: ActionMapperEntities,
    integrations: ActionMapperIntegrations
  ): Action {
    const { action } = config
    const {
      idGenerator,
      templateCompiler,
      javascriptCompiler,
      typescriptCompiler,
      logger,
      monitor,
    } = services
    const { tables } = entities
    const { pappers, qonto, notion, googleMail, gocardless } = integrations
    switch (action) {
      case 'CreateRecord':
        return CreateRecordDatabaseActionMapper.toEntity(
          config,
          { idGenerator, templateCompiler, logger, monitor },
          { tables }
        )
      case 'ReadRecord':
        return ReadRecordDatabaseActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { tables }
        )
      case 'RunJavascript':
        return RunJavascriptCodeActionMapper.toEntity(config, {
          templateCompiler,
          javascriptCompiler,
          logger,
          monitor,
        })
      case 'RunTypescript':
        return RunTypescriptCodeActionMapper.toEntity(config, {
          templateCompiler,
          typescriptCompiler,
          logger,
          monitor,
        })
      case 'GetCompany':
        return GetCompanyPappersActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { pappers }
        )
      case 'CreateClient':
        return CreateClientQontoActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { qonto }
        )
      case 'UpdatePage':
        return UpdatePageNotionActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { notion }
        )
      case 'SendEmail':
        return SendEmailGoogleMailActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { googleMail }
        )
      case 'CreatePayment':
        return CreatePaymentGoCardlessActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { gocardless }
        )
      case 'ListPayments':
        return ListPaymentsGoCardlessActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { gocardless }
        )
      case 'RetrieveAttachment':
        return RetrieveAttachmentQontoActionMapper.toEntity(
          config,
          { templateCompiler, logger, monitor },
          { qonto }
        )
      default:
        throw new Error(`ActionMapper: Action ${action} not supported`)
    }
  }

  static toManyEntities(
    configs: IAction[],
    services: ActionMapperServices,
    entities: ActionMapperEntities,
    integrations: ActionMapperIntegrations
  ): Action[] {
    return configs.map((config) => this.toEntity(config, services, entities, integrations))
  }
}
