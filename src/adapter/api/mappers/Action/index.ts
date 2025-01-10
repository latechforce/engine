import type { Action } from '@domain/entities/Action'
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
import type { IAction } from '@domain/interfaces/IAction'
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

export type ActionMapperServices = CreateRecordDatabaseActionMapperServices &
  RunJavascriptCodeActionMapperServices &
  RunTypescriptCodeActionMapperServices

export type ActionMapperEntities = CreateRecordDatabaseActionMapperEntities

export type ActionMapperIntegrations = GetCompanyPappersActionMapperIntegrations &
  CreateClientQontoActionMapperIntegrations &
  UpdatePageNotionActionMapperIntegrations

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
    const { pappers, qonto, notion } = integrations
    if (action === 'CreateRecord')
      return CreateRecordDatabaseActionMapper.toEntity(
        config,
        { idGenerator, templateCompiler, logger, monitor },
        { tables }
      )
    if (action === 'ReadRecord')
      return ReadRecordDatabaseActionMapper.toEntity(
        config,
        { templateCompiler, logger, monitor },
        { tables }
      )
    if (action === 'RunJavascript')
      return RunJavascriptCodeActionMapper.toEntity(config, {
        templateCompiler,
        javascriptCompiler,
        logger,
        monitor,
      })
    if (action === 'RunTypescript')
      return RunTypescriptCodeActionMapper.toEntity(config, {
        templateCompiler,
        typescriptCompiler,
        logger,
        monitor,
      })
    if (action === 'GetCompany')
      return GetCompanyPappersActionMapper.toEntity(
        config,
        {
          templateCompiler,
          logger,
          monitor,
        },
        {
          pappers,
        }
      )

    if (action === 'CreateClient')
      return CreateClientQontoActionMapper.toEntity(
        config,
        {
          templateCompiler,
          logger,
          monitor,
        },
        {
          qonto,
        }
      )
    if (action === 'UpdatePage')
      return UpdatePageNotionActionMapper.toEntity(
        config,
        {
          templateCompiler,
          logger,
          monitor,
        },
        {
          notion,
        }
      )
    throw new Error(`ActionMapper: Action ${action} not supported`)
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
