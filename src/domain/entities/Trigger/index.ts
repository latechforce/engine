import type { ApiCalledHttpTrigger } from './services/http/ApiCalled'
import type { TablePageCreatedNotionTrigger } from './integrations/notion/TablePageCreated'
import type { RecordCreatedDatabaseTrigger } from './services/database/RecordCreated'
import type { WebhookCalledHttpTrigger } from './services/http/WebhookCalled'
import type { CronTimeTickedScheduleTrigger } from './services/schedule/CronTimeTicked'
import type { InviteeCreatedCalendlyTrigger } from './integrations/calendly/InviteeCreated'
import type { FormWebhookReceivedTrigger } from './integrations/jotform/FormWebhookReceived'
import type { BookingCreatedTrigger } from './integrations/youcanbookme/BookingCreated'

export type Trigger =
  | WebhookCalledHttpTrigger
  | RecordCreatedDatabaseTrigger
  | ApiCalledHttpTrigger
  | TablePageCreatedNotionTrigger
  | CronTimeTickedScheduleTrigger
  | InviteeCreatedCalendlyTrigger
  | FormWebhookReceivedTrigger
  | BookingCreatedTrigger
