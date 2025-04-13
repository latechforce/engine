import type { RecordCreatedDatabaseTriggerConfig } from '/domain/entities/Trigger/services/database/RecordCreated'

/**
 * Record Created Database Trigger
 * @title Record Created
 * @description A trigger that fires when a record is created in a database
 */
export interface RecordCreatedDatabaseServiceTriggerAutomationSchema
  extends Omit<RecordCreatedDatabaseTriggerConfig, 'automation'> {
  service: 'Database'
  event: 'RecordCreated'
}
