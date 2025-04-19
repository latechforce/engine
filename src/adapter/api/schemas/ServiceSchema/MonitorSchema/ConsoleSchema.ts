import type { MonitorConsoleConfig } from '/domain/services'

/**
 * Console Monitor Service Schema
 * @title Console
 * @description Configuration for console monitoring services
 */
export interface ConsoleMonitorServiceSchema {
  /**
   * The type of monitor configuration
   * @title Type
   * @description The type of monitor configuration
   */
  type: MonitorConsoleConfig['type']
}
