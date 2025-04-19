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
  /**
   * Server configuration
   * @title Server
   * @description Configuration for the server service.
   */
  server?: ServerServiceSchema
  /**
   * Database configuration
   * @title Database
   * @description Configuration for the database service.
   */
  database?: DatabaseServiceSchema
  /**
   * Monitor configurations
   * @title Monitors
   * @description Configurations for monitoring services.
   */
  monitors?: MonitorServiceSchema[]
  /**
   * Logger configurations
   * @title Loggers
   * @description Configurations for logging services.
   */
  loggers?: LoggerServiceSchema[]
  /**
   * Tunnel configuration
   * @title Tunnel
   * @description Configuration for the tunnel service.
   */
  tunnel?: TunnelServiceSchema
  /**
   * Theme configuration
   * @title Theme
   * @description Configuration for the theme service.
   */
  theme?: ThemeServiceSchema
}
