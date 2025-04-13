import type { CreateRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/CreateRecord'

/**
 * Interface for creating a new record in a database table
 * @title Create Record
 * @description Creates a new record in the specified database table with the given fields
 *
 * @example
 * {
 *   service: 'Database',
 *   action: 'CreateRecord',
 *   table: 'users',
 *   fields: {
 *     name: '{{trigger.payload.name}}',
 *     email: '{{trigger.payload.email}}',
 *     role: 'customer',
 *     createdAt: '{{now}}'
 *   }
 * }
 */
export interface CreateRecordDatabaseActionSchema extends CreateRecordDatabaseActionConfig {
  service: 'Database'
  action: 'CreateRecord'
}
