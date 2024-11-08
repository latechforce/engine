import type { Drivers } from '@adapter/spi/drivers'
import type { Config as ServerConfig } from '@domain/services/Server'
import type { Config as DatabaseConfig } from '@domain/services/Database'
import type { Config as QueueConfig } from '@domain/services/Queue'
import type { Config as MailerConfig } from '@domain/services/Mailer'
import type { Config as AuthConfig } from '@domain/services/Auth'
import type { Config as ThemeConfig } from '@domain/services/Theme'
import type { Config as StorageConfig } from '@domain/services/Storage'
import type { Config as MonitorConfig } from '@domain/services/Monitor'
import type { Config as LoggerConfig } from '@domain/services/Logger'
import type { Config as CodeConfig } from '@domain/services/CodeCompiler'

import { MonitorDriver } from './MonitorDriver'
import { StorageDriver } from './StorageDriver'
import { SchemaValidatorDriver } from './SchemaValidatorDriver'
import { BrowserDriver } from './BrowserDriver'
import { ServerDriver } from './ServerDriver'
import { LoggerDriver } from './LoggerDriver'
import { IdGeneratorDriver } from './IdGeneratorDriver'
import { DatabaseDriver } from './DatabaseDriver'
import { QueueDriver } from './QueueDriver'
import { MailerDriver } from './MailerDriver'
import { TemplateCompilerDriver } from './TemplateCompilerDriver'
import { AuthDriver } from './AuthDriver'
import { ClientDriver } from './ClientDriver'
import { MarkdownParserDriver } from './MarkdownParserDriver'
import { ThemeDriver } from './ThemeDriver'
import { IconLibraryDriver } from './IconLibraryDriver'
import { FontLibraryDriver } from './FontLibraryDriver'
import { CodeCompilerDriver } from './CodeCompilerDriver'
import { FileSystemDriver } from './FileSystemDriver'
import { SpreadsheetLoaderDriver } from './SpreadsheetLoaderDriver'
import { DocumentLoaderDriver } from './DocumentLoaderDriver'

export const drivers: Drivers = {
  server: (config: ServerConfig) => new ServerDriver(config),
  database: (config: DatabaseConfig) => new DatabaseDriver(config),
  queue: (config: QueueConfig) => new QueueDriver(config),
  storage: (config: StorageConfig) => new StorageDriver(config),
  mailer: (config: MailerConfig) => new MailerDriver(config),
  auth: (config: AuthConfig) => new AuthDriver(config),
  theme: (config: ThemeConfig) => new ThemeDriver(config),
  monitor: (config: MonitorConfig) => new MonitorDriver(config),
  logger: (config: LoggerConfig) => new LoggerDriver(config),
  codeCompiler: (config: CodeConfig) => new CodeCompilerDriver(config),
  markdownParser: () => new MarkdownParserDriver(),
  templateCompiler: () => new TemplateCompilerDriver(),
  schemaValidator: () => new SchemaValidatorDriver(),
  browser: () => new BrowserDriver(),
  client: () => new ClientDriver(),
  idGenerator: () => new IdGeneratorDriver(),
  iconLibrary: () => new IconLibraryDriver(),
  fontLibrary: () => new FontLibraryDriver(),
  fileSystem: () => new FileSystemDriver(),
  spreadsheetLoader: () => new SpreadsheetLoaderDriver(),
  documentLoader: () => new DocumentLoaderDriver(),
}
