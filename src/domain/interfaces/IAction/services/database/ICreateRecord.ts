import type { CreateRecordDatabaseActionConfig } from '/domain/entities/Action/services/database/CreateRecord'

/**
 * Interface for creating a new record in a database table
 * @title Create Database Record Action
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
 *
 * @property {string} service - Always 'Database' for database actions
 * @property {string} action - Always 'CreateRecord' for record creation
 * @property {string} table - The name of the table to create the record in
 * @property {object} fields - The fields and their values for the new record
 */
export interface ICreateRecordDatabaseAction extends CreateRecordDatabaseActionConfig {
  service: 'Database'
  action: 'CreateRecord'
}
