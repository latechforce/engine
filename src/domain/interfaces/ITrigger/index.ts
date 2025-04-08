import type { IApiCalledHttpTrigger } from './http/IApiCalled'
import type { IRecordCreatedDatabaseTrigger } from './database/IRecordCreated'
import type { IWebhookCalledHttpTrigger } from './http/IWebhookCalled'
import type { IPageCreatedNotionTrigger } from './notion/ITablePageCreated'
import type { ICronTimeTickedScheduleTrigger } from './schedule/ICronTimeTicked'
import type { IInviteeCreatedTrigger } from './calendly/IInviteeCreated'
import type { IBookingCreatedTrigger } from './youCanBookMe/IBookingCreated'

export type ITrigger =
  | IApiCalledHttpTrigger
  | IRecordCreatedDatabaseTrigger
  | IWebhookCalledHttpTrigger
  | IPageCreatedNotionTrigger
  | ICronTimeTickedScheduleTrigger
  | IInviteeCreatedTrigger
  | IBookingCreatedTrigger
