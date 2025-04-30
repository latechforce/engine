import type { ApiCalledHttpTrigger } from '/domain/entities/Trigger/services/http/ApiCalled'
import type { TablePageCreatedNotionTrigger } from '/domain/entities/Trigger/integrations/notion/TablePageCreated'
import type { RecordCreatedDatabaseTrigger } from '/domain/entities/Trigger/services/database/RecordCreated'
import type { WebhookCalledHttpTrigger } from '/domain/entities/Trigger/services/http/WebhookCalled'
import type { CronTimeTickedScheduleTrigger } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'
import type { InviteeCreatedCalendlyTrigger } from '/domain/entities/Trigger/integrations/calendly/InviteeCreated'
import type { FormWebhookReceivedTrigger } from '/domain/entities/Trigger/integrations/jotform/FormWebhookReceived'
import type { BookingCreatedTrigger } from './integrations/youcanbookme/BookingCreated'
import type { WebinarParticipantJoinedTrigger } from './integrations/zoom/WebinarParticipantJoined'

export type Trigger =
  | WebhookCalledHttpTrigger
  | RecordCreatedDatabaseTrigger
  | ApiCalledHttpTrigger
  | TablePageCreatedNotionTrigger
  | CronTimeTickedScheduleTrigger
  | InviteeCreatedCalendlyTrigger
  | FormWebhookReceivedTrigger
  | BookingCreatedTrigger
  | WebinarParticipantJoinedTrigger
