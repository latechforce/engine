import type { TableSchema } from './TableSchema'
import type { AutomationSchema } from './AutomationSchema'
import type { BucketSchema } from './BucketSchema'
import type { IntegrationSchema } from './IntegrationSchema'
import type { FormSchema } from './FormSchema'

import type { MonitorConsoleConfig } from '/domain/services/Monitor'
import type { MonitorSentryConfig } from '/domain/services/Monitor'
import type { ThemeConfig } from '/domain/services/Theme'
import type { ServerConfig } from '/domain/services/Server'
import type { DatabaseConfig } from '/domain/services/Database'
import type { LoggersConfig } from '/domain/services/Logger'
import type { TunnelConfig } from '/domain/services/Tunnel'

/**
 * Engine configuration
 * @title Config
 * @description This is the configuration of the engine.
 */
export type ConfigSchema = {
  /**
   * Engine name
   * @title Name
   * @description The name of the engine
   */
  name: string
  /**
   * Config version
   * @title Config version
   * @description The version of the config
   */
  version: string
  /**
   * Engine version
   * @title Engine version
   * @description The version of the engine
   */
  engine: string
  /**
   * Engine description
   * @title Description
   * @description The description of the engine
   */
  description?: string
  /**
   * Forms
   * @title Forms
   * @description The forms of the engine
   */
  forms?: FormSchema[]
  /**
   * Automations
   * @title Automations
   * @description The automations of the engine
   */
  automations?: AutomationSchema[]
  /**
   * Tables
   * @title Tables
   * @description The tables of the engine
   */
  tables?: TableSchema[]
  /**
   * Buckets
   * @title Buckets
   * @description The buckets of the engine
   */
  buckets?: BucketSchema[]
  /**
   * Integrations
   * @title Integrations
   * @description The integrations of the engine
   */
  integrations?: IntegrationSchema
  /**
   * Server
   * @title Server
   * @description The server of the engine
   */
  server?: Omit<ServerConfig, 'appName' | 'appVersion' | 'appDescription'>
  /**
   * Database
   * @title Database
   * @description The database of the engine
   */
  database?: DatabaseConfig
  /**
   * Monitors
   * @title Monitors
   * @description The monitors of the engine
   */
  monitors?: (Omit<MonitorSentryConfig, 'appName' | 'appVersion'> | MonitorConsoleConfig)[]
  /**
   * Loggers
   * @title Loggers
   * @description The loggers of the engine
   */
  loggers?: LoggersConfig
  /**
   * Tunnel
   * @title Tunnel
   * @description The tunnel of the engine
   */
  tunnel?: TunnelConfig
  /**
   * Themes
   * @title Themes
   * @description The themes of the engine
   */
  theme?: ThemeConfig
}
