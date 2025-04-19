import type { DatabaseConfig } from '/domain/services'

/**
 * Database configuration interface
 * @title Database
 * @description Configuration for the database service
 * @default
 * {
 *   type: "SQLite",
 *   url: ":memory:",
 * }
 */
export type DatabaseServiceSchema = {
  /**
   * @title Type
   * @description The type of database to use.
   */
  type: DatabaseConfig['type']
  /**
   * @title URL
   * @description The URL of the database.
   */
  url: DatabaseConfig['url']
}
