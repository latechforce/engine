import type { TableSchema } from './TableSchema'
import type { AutomationSchema } from './AutomationSchema'
import type { BucketSchema } from './BucketSchema'
import type { IntegrationsSchema } from './IntegrationsSchema'
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
 * @title Engine configuration
 * @description This is the configuration of the engine.
 */
export type ConfigSchema = {
  name: string
  version: string
  engine: string
  description?: string
  forms?: FormSchema[]
  tables?: TableSchema[]
  buckets?: BucketSchema[]
  automations?: AutomationSchema[]
  integrations?: IntegrationsSchema
  server?: Omit<ServerConfig, 'appName' | 'appVersion' | 'appDescription'>
  database?: DatabaseConfig
  monitors?: (Omit<MonitorSentryConfig, 'appName' | 'appVersion'> | MonitorConsoleConfig)[]
  loggers?: LoggersConfig
  tunnel?: TunnelConfig
  theme?: ThemeConfig
}
