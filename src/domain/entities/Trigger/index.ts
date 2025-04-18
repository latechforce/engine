import type { ApiCalledHttpTrigger } from '/domain/entities/Trigger/services/http/ApiCalled'
import type { TablePageCreatedNotionTrigger } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'
import type { RecordCreatedDatabaseTrigger } from '/domain/entities/Trigger/services/database/RecordCreated'
import type { WebhookCalledHttpTrigger } from '/domain/entities/Trigger/services/http/WebhookCalled'
import type { CronTimeTickedScheduleTrigger } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'
import type { InviteeCreatedCalendlyTrigger } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'
import type { BookingCreatedTrigger } from './integrations/notion/BookingCreated'

export type Trigger =
  | WebhookCalledHttpTrigger
  | RecordCreatedDatabaseTrigger
  | ApiCalledHttpTrigger
  | TablePageCreatedNotionTrigger
  | CronTimeTickedScheduleTrigger
  | InviteeCreatedCalendlyTrigger
  | BookingCreatedTrigger
