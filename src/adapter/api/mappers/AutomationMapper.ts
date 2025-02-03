import { Automation } from '/domain/entities/Automation'
import type { IAutomation } from '../../../domain/interfaces/IAutomation'
import {
  ActionMapper,
  type ActionMapperServices,
  type ActionMapperEntities,
  type ActionMapperIntegrations,
} from './Action'
import {
  TriggerMapper,
  type TriggerMapperServices,
  type TriggerMapperIntegrations,
} from './Trigger'
import type { Database } from '/domain/services/Database'

export type AutomationMapperServices = ActionMapperServices &
  TriggerMapperServices & {
    database: Database
  }

export type AutomationMapperEntities = ActionMapperEntities

export type AutomationMapperIntegrations = TriggerMapperIntegrations & ActionMapperIntegrations

export class AutomationMapper {
  static toEntity = (
    config: IAutomation,
    services: AutomationMapperServices,
    entities: AutomationMapperEntities,
    integrations: AutomationMapperIntegrations
  ) => {
    const {
      logger,
      server,
      queue,
      idGenerator,
      templateCompiler,
      realtime,
      javascriptCompiler,
      typescriptCompiler,
      monitor,
      database,
    } = services
    const { notion, pappers, qonto } = integrations
    const trigger = TriggerMapper.toEntity(
      {
        ...config.trigger,
        automation: config.name,
        summary: config.summary,
        description: config.description,
      },
      {
        server,
        queue,
        realtime,
        templateCompiler,
        monitor,
      },
      {
        notion,
      }
    )
    const actions = ActionMapper.toManyEntities(
      config.actions,
      {
        idGenerator,
        templateCompiler,
        javascriptCompiler,
        typescriptCompiler,
        logger,
        monitor,
      },
      entities,
      {
        pappers,
        qonto,
        notion,
      }
    )
    return new Automation(config, { logger, monitor, idGenerator, database }, { trigger, actions })
  }

  static toManyEntities = (
    configs: IAutomation[] = [],
    services: AutomationMapperServices,
    entities: AutomationMapperEntities,
    integrations: AutomationMapperIntegrations
  ) => {
    return configs.map((config) => this.toEntity(config, services, entities, integrations))
  }
}
