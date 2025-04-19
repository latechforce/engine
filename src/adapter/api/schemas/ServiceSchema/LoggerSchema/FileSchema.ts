import type { LoggerFileConfig } from '/domain/services'

/**
 * File Logger Service Schema
 * @title File
 * @description Configuration for file-based logging services
 */
export interface FileLoggerServiceSchema {
  /**
   * The type of logger configuration
   * @title Type
   * @description The type of logger configuration
   */
  type: LoggerFileConfig['type']
  /**
   * The minimum log level to output messages
   * @title Level
   * @description The minimum log level to output messages
   */
  level?: LoggerFileConfig['level']
  /**
   * Whether to suppress all log output
   * @title Silent
   * @description Whether to suppress all log output
   */
  silent?: LoggerFileConfig['silent']
  /**
   * The path to the log file
   * @title Filename
   * @description The path to the log file
   */
  filename: LoggerFileConfig['filename']
}
