import type { IApiCalledHttpTrigger } from './services/http/IApiCalled'
import type { IRecordCreatedDatabaseTrigger } from './services/database/IRecordCreated'
import type { IWebhookCalledHttpTrigger } from './services/http/IWebhookCalled'
import type { IPageCreatedNotionTrigger } from './integrations/notion/ITablePageCreated'
import type { ICronTimeTickedScheduleTrigger } from './services/schedule/ICronTimeTicked'
import type { IInviteeCreatedTrigger } from './integrations/calendly/IInviteeCreated'

export type ITrigger =
  | IApiCalledHttpTrigger
  | IRecordCreatedDatabaseTrigger
  | IWebhookCalledHttpTrigger
  | IPageCreatedNotionTrigger
  | ICronTimeTickedScheduleTrigger
  | IInviteeCreatedTrigger
