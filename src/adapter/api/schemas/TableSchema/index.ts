import type { FieldTableSchema } from './FieldSchema'

/**
 * Table configuration interface
 * @title Table
 * @description Defines the structure of a database table.
 */
export interface TableSchema {
  /**
   * Table name
   * @title Name
   * @description The unique identifier for the table.
   */
  name: string
  /**
   * Database schema
   * @title Schema
   * @description The database schema where the table is located.
   * @default "`public`"
   */
  schema?: string
  /**
   * Table fields
   * @title Fields
   * @description Array of field definitions for the table.
   */
  fields?: FieldTableSchema[]
}
