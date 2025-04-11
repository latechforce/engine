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

/**
 * Services configuration type
 * @title Services configuration
 * @description Defines all the service configurations for the application
 */
export type IServices = {
  /**
   * Server configuration
   * @description Configuration for the application server
   * @example { port: 3000, baseUrl: "https://api.example.com", apiKeys: ["secret-key-1", "secret-key-2"] }
   */
  server?: Omit<ServerConfig, 'appName' | 'appVersion' | 'appDescription'>
  /**
   * Database configuration
   * @description Configuration for the database connection
   * @example { driver: "PostgreSQL", url: "postgresql://user:password@localhost:5432/mydb?sslmode=require" }
   */
  database?: DatabaseConfig
  /**
   * Monitoring configurations
   * @description Array of monitoring service configurations
   * @example [
   *   { driver: "Sentry", dsn: "https://examplePublicKey@o0.ingest.sentry.io/0", environment: "production" },
   *   { driver: "Console" }
   * ]
   */
  monitors?: (Omit<MonitorSentryConfig, 'appName' | 'appVersion'> | MonitorConsoleConfig)[]
  /**
   * Logging configurations
   * @description Configuration for application logging
   * @example [{ driver: "Console", level: "info" }]
   */
  loggers?: LoggersConfig
  /**
   * Tunnel configuration
   * @description Configuration for network tunneling
   * @example { integration: "Ngrok", authtoken: "your-ngrok-token" }
   */
  tunnel?: TunnelConfig
  /**
   * Theme configuration
   * @description Configuration for application theming
   * @example { type: "tailwindcss", base: "src/styles/base.css" }
   */
  theme?: ThemeConfig
}
