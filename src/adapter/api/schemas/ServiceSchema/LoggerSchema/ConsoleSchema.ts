import type { LoggerConsoleConfig } from '/domain/services'

/**
 * Console Logger Service Schema
 * @title Console
 * @description Configuration for console logging services
 */
export interface ConsoleLoggerServiceSchema {
  /**
   * The type of logger configuration
   * @title Type
   * @description The type of logger configuration
   */
  type: LoggerConsoleConfig['type']
  /**
   * The minimum log level to output messages
   * @title Level
   * @description The minimum log level to output messages
   */
  level?: LoggerConsoleConfig['level']
  /**
   * Whether to suppress all log output
   * @title Silent
   * @description Whether to suppress all log output
   */
  silent?: LoggerConsoleConfig['silent']
}
