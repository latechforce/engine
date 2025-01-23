import type { Drivers } from '@adapter/spi/drivers'
import type { ServerConfig } from '@domain/services/Server'
import type { QueueConfig } from '@domain/services/Queue'
import type { StorageConfig } from '@domain/services/Storage'
import type { MonitorsConfig } from '@domain/services/Monitor'
import type { LoggersConfig } from '@domain/services/Logger'
import type { CodeCompilerConfig } from '@domain/services/CodeCompiler'
import type { TunnelConfig } from '@domain/services/Tunnel'

import { MonitorDriver } from './MonitorDriver'
import { StorageDriver } from './StorageDriver'
import { SchemaValidatorDriver } from './SchemaValidatorDriver'
import { ServerDriver } from './ServerDriver'
import { LoggerDriver } from './LoggerDriver'
import { IdGeneratorDriver } from './IdGeneratorDriver'
import { QueueDriver } from './QueueDriver'
import { TemplateCompilerDriver } from './TemplateCompilerDriver'
import { CodeCompilerDriver } from './CodeCompilerDriver'
import { FileSystemDriver } from './FileSystemDriver'
import { TunnelDriver } from './TunnelDriver'
import { FetcherDriver } from './FetcherDriver'

export const drivers: Omit<Drivers, 'database'> = {
  tunnel: (config?: TunnelConfig) => new TunnelDriver(config),
  server: (config: ServerConfig) => new ServerDriver(config),
  queue: (config: QueueConfig) => new QueueDriver(config),
  storage: (config: StorageConfig) => new StorageDriver(config),
  monitor: (config: MonitorsConfig) => new MonitorDriver(config),
  logger: (config: LoggersConfig) => new LoggerDriver(config),
  codeCompiler: (config: CodeCompilerConfig) => new CodeCompilerDriver(config),
  templateCompiler: () => new TemplateCompilerDriver(),
  schemaValidator: () => new SchemaValidatorDriver(),
  idGenerator: () => new IdGeneratorDriver(),
  fileSystem: () => new FileSystemDriver(),
  fetcher: () => new FetcherDriver(),
}
