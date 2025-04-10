import type { ITrigger } from '/domain/interfaces/ITrigger'
import type { Trigger } from '/domain/entities/Trigger'
import type { Queue } from '/domain/services/Queue'
import type { Realtime } from '/domain/services/Realtime'
import type { Server } from '/domain/services/Server'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { Monitor } from '/domain/services/Monitor'
import type { Notion } from '/domain/integrations/Notion'
import { RecordCreatedDatabaseTriggerMapper } from './services/database/RecordCreatedMapper'
import { ApiCalledHttpTriggerMapper } from './services/http/ApiCalledMapper'
import { WebhookCalledHttpTriggerMapper } from './services/http/WebhookCalledMapper'
import { TablePageCreatedNotionTriggerMapper } from './integrations/notion/TablePageCreatedMapper'
import { CronTimeTickedScheduleTriggerMapper } from './services/schedule/CronTimeTicked'
import type { Cron } from '/domain/services/Cron'
import type { System } from '/domain/services/System'
import { InviteeCreatedCalendlyTriggerMapper } from './integrations/calendly/InviteeCreatedMapper'
import type { Calendly } from '/domain/integrations/Calendly'

type TriggerMapperConfig = ITrigger & {
  automation: string
  summary?: string
  description?: string
}

export interface TriggerMapperServices {
  server: Server
  queue: Queue
  realtime: Realtime
  templateCompiler: TemplateCompiler
  monitor: Monitor
  cron: Cron
  system: System
}

export interface TriggerMapperIntegrations {
  notion: Notion
  calendly: Calendly
}

export class TriggerMapper {
  static toEntity(
    config: TriggerMapperConfig,
    services: TriggerMapperServices,
    integrations: TriggerMapperIntegrations
  ): Trigger {
    const { event } = config
    switch (event) {
      case 'RecordCreated':
        return RecordCreatedDatabaseTriggerMapper.toEntity(config, services)
      case 'WebhookCalled':
        return WebhookCalledHttpTriggerMapper.toEntity(config, services)
      case 'ApiCalled':
        return ApiCalledHttpTriggerMapper.toEntity(config, services)
      case 'TablePageCreated':
        return TablePageCreatedNotionTriggerMapper.toEntity(config, services, integrations)
      case 'CronTimeTicked':
        return CronTimeTickedScheduleTriggerMapper.toEntity(config, services)
      case 'InviteeCreated':
        return InviteeCreatedCalendlyTriggerMapper.toEntity(config, services, integrations)
      default:
        throw new Error(`TriggerMapper: trigger ${event} not found`)
    }
  }
}
