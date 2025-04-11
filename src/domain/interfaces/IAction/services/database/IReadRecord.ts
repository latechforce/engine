import type { ReadRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/ReadRecord'

/**
 * Interface for reading a record from a database table
 * @title Read Database Record Action
 * @description Retrieves a record from the specified database table by its ID
 *
 * @example
 * {
 *   service: 'Database',
 *   action: 'ReadRecord',
 *   table: 'users',
 *   id: '{{trigger.payload.userId}}'
 * }
 *
 * @property {string} service - Always 'Database' for database actions
 * @property {string} action - Always 'ReadRecord' for record retrieval
 * @property {string} table - The name of the table to read the record from
 * @property {string} id - The unique identifier of the record to retrieve
 */
export interface IReadRecordDatabaseAction extends ReadRecordDatabaseActionConfig {
  service: 'Database'
  action: 'ReadRecord'
}
