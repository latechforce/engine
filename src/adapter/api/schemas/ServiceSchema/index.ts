import type { DatabaseServiceSchema } from './DatabaseSchema'
import type { LoggerServiceSchema } from './LoggerSchema'
import type { MonitorServiceSchema } from './MonitorSchema'
import type { ServerServiceSchema } from './ServerSchema'
import type { ThemeServiceSchema } from './ThemeSchema'
import type { TunnelServiceSchema } from './TunnelSchema'

/**
 * Services configuration interface
 * @title Services
 * @description Defines configurations for various services
 */
export interface ServiceSchema {
  server?: ServerServiceSchema
  /**
   * Database
   * @description The database of the engine
   */
  database?: DatabaseServiceSchema
  /**
   * Monitors
   * @description The monitors of the engine
   */
  monitors?: MonitorServiceSchema[]
  /**
   * Loggers
   * @description The loggers of the engine
   */
  loggers?: LoggerServiceSchema[]
  /**
   * Tunnel
   * @description The tunnel of the engine
   */
  tunnel?: TunnelServiceSchema
  /**
   * Themes
   * @description The themes of the engine
   */
  theme?: ThemeServiceSchema
}
