import type { RecordCreatedDatabaseTriggerConfig } from '/domain/entities/Trigger/services/database/RecordCreated'

/**
 * Record Created Database Trigger
 * @title Record Created
 * @description A trigger that fires when a record is created in a database
 */
export interface RecordCreatedDatabaseServiceTriggerAutomationSchema {
  /**
   * The service type for this trigger
   * @title Service
   * @description The service type for this trigger
   */
  service: 'Database'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'RecordCreated'
  /**
   * The table name for this trigger
   * @title Table
   * @description The table name for this trigger
   */
  table: RecordCreatedDatabaseTriggerConfig['table']
}
