import type { ApiCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/ApiCalled'

/**
 * Api Called HTTP Trigger
 * @title Api Called
 * @description A trigger that fires when an API is called
 */
export interface ApiCalledHttpServiceTriggerAutomationSchema
  extends Omit<ApiCalledHttpTriggerConfig, 'automation' | 'summary' | 'description'> {
  service: 'Http'
  event: 'ApiCalled'
}
