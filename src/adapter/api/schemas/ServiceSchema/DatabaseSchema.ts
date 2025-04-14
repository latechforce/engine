import type { DatabaseConfig } from '/domain/services'

/**
 * Database config
 * @title Database
 * @description The database config for the engine
 * @default
 * {
 *   driver: "SQLite",
 *   url: ":memory:",
 * }
 */
export type DatabaseServiceSchema = DatabaseConfig
