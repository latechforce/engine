import { Automation } from '/domain/entities/Automation'
import type { AutomationSchema } from '../schemas/AutomationSchema'
import {
  ActionMapper,
  type ActionMapperServices,
  type ActionMapperEntities,
  type ActionMapperIntegrations,
} from './ActionMapper'
import {
  TriggerMapper,
  type TriggerMapperServices,
  type TriggerMapperIntegrations,
} from './TriggerMapper'
import type { Database } from '/domain/services/Database'

export type AutomationMapperServices = ActionMapperServices &
  TriggerMapperServices & {
    database: Database
  }

export type AutomationMapperEntities = ActionMapperEntities

export type AutomationMapperIntegrations = TriggerMapperIntegrations & ActionMapperIntegrations

export class AutomationMapper {
  static toEntity = (
    schema: AutomationSchema,
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
      cron,
      system,
    } = services
    const { notion, pappers, qonto, googleMail, gocardless, calendly, jotform } = integrations
    const trigger = TriggerMapper.toEntity(
      schema.trigger,
      schema,
      {
        server,
        queue,
        realtime,
        templateCompiler,
        monitor,
        cron,
        system,
      },
      {
        notion,
        calendly,
        jotform,
      }
    )
    const actions = ActionMapper.toManyEntities(
      schema.actions,
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
        googleMail,
        gocardless,
      }
    )
    return new Automation(schema, { logger, monitor, idGenerator, database }, { trigger, actions })
  }

  static toManyEntities = (
    schemas: AutomationSchema[] = [],
    services: AutomationMapperServices,
    entities: AutomationMapperEntities,
    integrations: AutomationMapperIntegrations
  ) => {
    return schemas.map((schema) => this.toEntity(schema, services, entities, integrations))
  }
}
