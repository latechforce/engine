import type { IApiCalledHttpTrigger } from './http/IApiCalled'
import type { IRecordCreatedDatabaseTrigger } from './database/IRecordCreated'
import type { IWebhookCalledHttpTrigger } from './http/IWebhookCalled'
import type { IPageCreatedNotionTrigger } from './notion/ITablePageCreated'
import type { ICronTimeTickedScheduleTrigger } from './schedule/ICronTimeTicked'

export type ITrigger =
  | IApiCalledHttpTrigger
  | IRecordCreatedDatabaseTrigger
  | IWebhookCalledHttpTrigger
  | IPageCreatedNotionTrigger
  | ICronTimeTickedScheduleTrigger
