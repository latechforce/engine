import type { ConsoleLoggerServiceSchema } from './ConsoleSchema'
import type { FileLoggerServiceSchema } from './FileSchema'

/**
 * Logger configuration interface
 * @title Logger
 * @description Configuration for logging services
 * @default
 * {
 *   type: "Console",
 *   level: "info",
 * }
 */
export type LoggerServiceSchema = ConsoleLoggerServiceSchema | FileLoggerServiceSchema
