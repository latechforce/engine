import type { CreateRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/CreateRecord'

/**
 * Interface for creating a new record in a database table
 * @title Create Record
 * @description Creates a new record in the specified database table with the given fields

 */
export interface CreateRecordDatabaseServiceActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: CreateRecordDatabaseActionConfig['name']
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
  action: 'CreateRecord'
  /**
   * The table name for this action
   * @title Table
   * @description The table name for this action
   */
  table: CreateRecordDatabaseActionConfig['table']
  /**
   * The fields for this action
   * @title Fields
   * @description The fields for this action
   */
  fields: CreateRecordDatabaseActionConfig['fields']
}
