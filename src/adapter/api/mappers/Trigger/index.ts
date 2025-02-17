import type { ITrigger } from '/domain/interfaces/ITrigger'
import type { Trigger } from '/domain/entities/Trigger'
import type { Queue } from '/domain/services/Queue'
import type { Realtime } from '/domain/services/Realtime'
import type { Server } from '/domain/services/Server'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { Monitor } from '/domain/services/Monitor'
import type { Notion } from '/domain/integrations/Notion'
import { RecordCreatedDatabaseTriggerMapper } from './database/RecordCreatedMapper'
import { ApiCalledHttpTriggerMapper } from './http/ApiCalledMapper'
import { WebhookCalledHttpTriggerMapper } from './http/WebhookCalledMapper'
import { TablePageCreatedNotionTriggerMapper } from './notion/TablePageCreatedMapper'
import { CronTimeTickedScheduleTriggerMapper } from './schedule/CronTimeTicked'
import type { Cron } from '/domain/services/Cron'

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
}

export interface TriggerMapperIntegrations {
  notion: Notion
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
      default:
        throw new Error(`TriggerMapper: trigger ${event} not found`)
    }
  }
}
