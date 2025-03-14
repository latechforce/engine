import type { ThemeConfig } from '/domain/services/Theme'
import type { DatabaseConfig } from '/domain/services/Database'
import type { LoggersConfig } from '/domain/services/Logger'
import type {
  MonitorConsoleConfig,
  MonitorsConfig,
  MonitorSentryConfig,
} from '/domain/services/Monitor'
import type { ServerConfig } from '/domain/services/Server'
import type { TunnelConfig } from '/domain/services/Tunnel'

export type { DatabaseConfig, LoggersConfig, MonitorsConfig, ServerConfig, TunnelConfig }

export type IServices = {
  server?: Omit<ServerConfig, 'appName' | 'appVersion' | 'appDescription'>
  database?: DatabaseConfig
  monitors?: (Omit<MonitorSentryConfig, 'appName' | 'appVersion'> | MonitorConsoleConfig)[]
  loggers?: LoggersConfig
  tunnel?: TunnelConfig
  theme?: ThemeConfig
}
