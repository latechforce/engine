import type { IField } from './IField'

/**
 * Table configuration interface
 * @title Table configuration
 * @description Defines the structure of a database table
 */
export interface ITable {
  /**
   * Table name
   * @description The unique identifier for the table
   * @example "users"
   */
  name: string
  /**
   * Database schema
   * @description The database schema where the table is located
   * @example "public"
   */
  schema?: string
  /**
   * Table fields
   * @description Array of field definitions for the table
   * @example [{ name: "id", type: "string", required: true }]
   */
  fields: IField[]
}
