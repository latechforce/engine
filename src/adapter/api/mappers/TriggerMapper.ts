import type { Trigger } from '/domain/entities/Trigger'
import type { Queue } from '/domain/services/Queue'
import type { Realtime } from '/domain/services/Realtime'
import type { Server } from '/domain/services/Server'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { Monitor } from '/domain/services/Monitor'
import type { Notion } from '/domain/integrations/Notion'
import type { Cron } from '/domain/services/Cron'
import type { System } from '/domain/services/System'
import type { Calendly } from '/domain/integrations/Calendly'
import type { TriggerAutomationSchema } from '../schemas/AutomationSchema/TriggerSchema'
import { TablePageCreatedNotionTrigger } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'
import type { AutomationSchema } from '../schemas/AutomationSchema'
import { InviteeCreatedCalendlyTrigger } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'
import { RecordCreatedDatabaseTrigger } from '/domain/entities/Trigger/services/database/RecordCreated'
import { CronTimeTickedScheduleTrigger } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'
import { ApiCalledHttpTrigger } from '/domain/entities/Trigger/services/http/ApiCalled'
import { WebhookCalledHttpTrigger } from '/domain/entities/Trigger/services/http/WebhookCalled'
import type { Jotform } from '/domain/integrations/Jotform'
import { FormWebhookReceivedTrigger } from '/domain/entities/Trigger/integrations/jotform/FormWebhookReceived'
import type { YouCanBookMe } from '/domain/integrations/YouCanBookMe'
import { BookingCreatedTrigger } from '../../../domain/entities/Trigger/integrations/youcanbookme/BookingCreated'

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
  jotform: Jotform
  youcanbookme: YouCanBookMe
}

export class TriggerMapper {
  static toEntity(
    schema: TriggerAutomationSchema,
    automationSchema: AutomationSchema,
    services: TriggerMapperServices,
    integrations: TriggerMapperIntegrations
  ): Trigger {
    const { name: automation, summary, description } = automationSchema
    if ('integration' in schema) {
      switch (schema.integration) {
        case 'Notion':
          switch (schema.event) {
            case 'TablePageCreated':
              return new TablePageCreatedNotionTrigger(
                { ...schema, automation },
                services,
                integrations
              )
          }
          break
        case 'Calendly':
          switch (schema.event) {
            case 'InviteeCreated':
              return new InviteeCreatedCalendlyTrigger(
                { ...schema, automation },
                services,
                integrations
              )
          }
          break
        case 'Jotform':
          switch (schema.event) {
            case 'FormWebhookReceived':
              return new FormWebhookReceivedTrigger(
                { ...schema, automation },
                services,
                integrations
              )
          }
          break
        case 'YouCanBookMe':
          switch (schema.event) {
            case 'BookingCreated':
              return new BookingCreatedTrigger({ ...schema, automation }, services, integrations)
          }
          break
      }
    } else {
      switch (schema.service) {
        case 'Database':
          switch (schema.event) {
            case 'RecordCreated':
              return new RecordCreatedDatabaseTrigger({ ...schema, automation }, services)
          }
          break
        case 'Http':
          switch (schema.event) {
            case 'ApiCalled':
              return new ApiCalledHttpTrigger(
                { ...schema, automation, summary, description },
                services
              )
            case 'WebhookCalled':
              return new WebhookCalledHttpTrigger(
                { ...schema, automation, summary, description },
                services
              )
          }
          break
        case 'Schedule':
          switch (schema.event) {
            case 'CronTimeTicked':
              return new CronTimeTickedScheduleTrigger({ ...schema, automation }, services)
          }
      }
    }
  }
}
