import type { Action } from '/domain/entities/Action'
import {
  RunJavascriptCodeActionMapper,
  type RunJavascriptCodeActionMapperServices,
} from './code/RunJavascriptMapper'
import {
  RunTypescriptCodeActionMapper,
  type RunTypescriptCodeActionMapperServices,
} from './code/RunTypescriptMapper'
import {
  CreateRecordDatabaseActionMapper,
  type CreateRecordDatabaseActionMapperEntities,
  type CreateRecordDatabaseActionMapperServices,
} from './database/CreateRecordMapper'
import type { IAction } from '/domain/interfaces/IAction'
import { ReadRecordDatabaseActionMapper } from './database/ReadRecordMapper'
import {
  GetCompanyPappersActionMapper,
  type GetCompanyPappersActionMapperIntegrations,
} from './pappers/GetCompanyMapper'
import {
  CreateClientQontoActionMapper,
  type CreateClientQontoActionMapperIntegrations,
} from './qonto/CreateClientMapper'
import {
  UpdatePageNotionActionMapper,
  type UpdatePageNotionActionMapperIntegrations,
} from './notion/UpdatePage'
import { SendEmailGoogleMailActionMapper } from './googleMail/SendEmailMapper'
import type { SendEmailGoogleMailActionIntegrations } from '/domain/entities/Action/googleMail/SendEmail'
import {
  CreatePaymentGoCardlessActionMapper,
  type CreatePaymentGoCardlessActionMapperIntegrations,
} from './gocardless/CreatePaymentMapper'
import { ListPaymentsGoCardlessActionMapper } from './gocardless/ListPaymentsMapper'

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
