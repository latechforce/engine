import type { ApiCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/ApiCalled'

export interface ApiCalledHttpTriggerSchema
  extends Omit<ApiCalledHttpTriggerConfig, 'automation' | 'summary' | 'description'> {
  service: 'Http'
  event: 'ApiCalled'
}
