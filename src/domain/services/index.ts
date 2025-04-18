export * from './Server'
export * from './Database'
export * from './DatabaseTable'
export * from './Logger'
export * from './Monitor'
export * from './Theme'
export * from './Tunnel'
export * from './Storage'
export * from './StorageBucket'
export * from './SchemaValidator'
export * from './Client'
export * from './CodeRunner'
export * from './CodeCompiler'
export * from './Cron'
export * from './Fetcher'
export * from './IdGenerator'
export * from './Queue'
export * from './Realtime'
export * from './System'
export * from './Template'
export * from './TemplateCompiler'

import type { DatabaseConfig } from './Database'
import type { ServerConfig } from './Server'
import type { ThemeConfig } from './Theme'
import type { TunnelConfig } from './Tunnel'
import type { LoggerConfig } from './Logger'
import type { MonitorConfig } from './Monitor'

export type ServicesConfig = {
  server?: ServerConfig
  database?: DatabaseConfig
  loggers?: LoggerConfig[]
  monitors?: MonitorConfig[]
  tunnel?: TunnelConfig
  theme?: ThemeConfig
}
