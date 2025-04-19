import type { ReadRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/ReadRecord'

/**
 * Interface for reading a record from the database
 * @title Read Record
 * @description Reads a record from the specified database table
 */
export interface ReadRecordDatabaseServiceActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: ReadRecordDatabaseActionConfig['name']
  /**
   * The service type for this action
   * @title Service
   * @description The service type for this action
   */
  service: 'Database'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'ReadRecord'
  /**
   * The table name for this action
   * @title Table
   * @description The table name for this action
   */
  table: ReadRecordDatabaseActionConfig['table']
  /**
   * The record identifier for this action
   * @title Record
   * @description The record identifier for this action
   */
  id: ReadRecordDatabaseActionConfig['id']
}
