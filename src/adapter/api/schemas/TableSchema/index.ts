import type { FieldTableSchema } from './FieldSchema'

/**
 * Table configuration interface
 * @title Table
 * @description Defines the structure of a database table
 */
export interface TableSchema {
  /**
   * Table name
   * @description The unique identifier for the table
   */
  name: string
  /**
   * Database schema
   * @description The database schema where the table is located
   */
  schema?: string
  /**
   * Table fields
   * @description Array of field definitions for the table
   */
  fields?: FieldTableSchema[]
}
