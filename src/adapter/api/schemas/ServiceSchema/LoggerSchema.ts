import type { LoggerConfig } from '/domain/services'

/**
 * Logger config
 * @title Logger
 * @description The logger config for the engine
 * @default
 * {
 *   driver: "Console",
 *   level: "info",
 * }
 */
export type LoggerServiceSchema = LoggerConfig
