import type { ApiCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/ApiCalled'

export interface IApiCalledHttpTrigger
  extends Omit<ApiCalledHttpTriggerConfig, 'automation' | 'summary' | 'description'> {
  service: 'Http'
  event: 'ApiCalled'
}
