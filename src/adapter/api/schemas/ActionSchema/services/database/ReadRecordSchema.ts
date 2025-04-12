import type { ReadRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/ReadRecord'

/**
 * Interface for reading a record from the database
 * @title Read Record Database Action
 * @description Reads a record from the specified database table
 *
 * @example
 * {
 *   service: 'Database',
 *   action: 'ReadRecord',
 *   table: 'users',
 *   id: 'user_123'
 * }
 */
export interface ReadRecordDatabaseActionSchema extends ReadRecordDatabaseActionConfig {
  service: 'Database'
  action: 'ReadRecord'
}
