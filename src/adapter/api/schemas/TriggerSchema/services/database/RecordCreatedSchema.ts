import type { RecordCreatedDatabaseTriggerConfig } from '/domain/entities/Trigger/services/database/RecordCreated'

export interface RecordCreatedDatabaseTriggerSchema
  extends Omit<RecordCreatedDatabaseTriggerConfig, 'automation'> {
  service: 'Database'
  event: 'RecordCreated'
}
