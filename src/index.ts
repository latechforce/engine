import { drivers } from '/infrastructure/drivers/common'
import { integrations } from '/infrastructure/integrations/common'
import { components } from '/infrastructure/components/tailwindcss'
import App from '/adapter/api'
import type { Drivers } from '/adapter/spi/drivers'
import type { Integrations } from '/adapter/spi/integrations'
import type { Components } from '/domain/components'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import type { DatabaseConfig } from '/domain/services/Database'
import type { MonitorConfig } from '/domain/services/Monitor'
import type { IMonitorDriver } from '/adapter/spi/drivers/MonitorSpi'
import type { ServerConfig } from '/domain/services/Server'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'
import type { StorageConfig } from '/domain/services/Storage'

export type { ConfigSchema as Config } from '/adapter/api/schemas/ConfigSchema'
export type { AutomationSchema as Automation } from '/adapter/api/schemas/AutomationSchema'
export type { ActionAutomationSchema as Action } from '/adapter/api/schemas/AutomationSchema/ActionSchema'
export type { TriggerAutomationSchema as Trigger } from '/adapter/api/schemas/AutomationSchema/TriggerSchema'
export type { TableSchema as Table } from '/adapter/api/schemas/TableSchema'
export type { FieldTableSchema as Field } from '/adapter/api/schemas/TableSchema/FieldSchema'
export type { FilterConfig as Filter } from '/domain/entities/Filter'
export type { BucketSchema as Bucket } from '/adapter/api/schemas/BucketSchema'
export type { FormSchema as Form } from '/adapter/api/schemas/FormSchema'
export type { InputFormSchema as Input } from '/adapter/api/schemas/FormSchema/InputSchema'
export type {
  DatabaseConfig as Database,
  LoggerConfig as Logger,
  MonitorConfig as Monitor,
  ServerConfig as Server,
  TunnelConfig as Tunnel,
} from '/domain/services'
export type {
  CodeRunnerContext,
  CodeRunnerContextServicesDatabase as DatabaseIntegration,
  CodeRunnerContextServicesDatabaseTable as DatabaseTable,
  CodeRunnerContextIntegrationsNotion as NotionIntegration,
  CodeRunnerContextIntegrationsNotionTable as NotionTable,
} from '/domain/services/CodeRunner'
export {
  NotionTablePage,
  type NotionTablePageProperties,
  type NotionTablePagePropertyValue,
  type ConvertToNotionTablePageProperties,
} from '/domain/integrations/Notion'
export type { NotionUser } from '/domain/integrations/Notion/NotionUser'
export type { NotionTablePageDto } from '/adapter/spi/dtos/NotionTablePageDto'
export {
  AirtableTableRecord,
  type AirtableTableRecordFields,
  type AirtableTableRecordFieldValue,
  type ConvertToAirtableTableRecordFields,
} from '/domain/integrations/Airtable'
export type { AirtableTableRecordDto } from '/adapter/spi/dtos/AirtableTableRecordDto'
export {
  type QontoCreateClient,
  type QontoClient,
  type QontoCreateClientInvoice,
  type QontoClientInvoice,
  type QontoAttachment,
} from '/domain/integrations/Qonto/QontoTypes'
export {
  Record as DatabaseTableRecord,
  type RecordFields as DatabaseTableRecordFields,
  type RecordFieldValue as DatabaseTableRecordFieldValue,
  type UpdateRecordFields as DatabaseTableUpdateRecordFields,
  type RecordFieldAttachment as DatabaseTableRecordFieldAttachment,
} from '/domain/entities/Record'
export { type File as StorageFile } from '/domain/entities/File'
export type { AppIntegrations } from '/domain/entities/App/Base'
export type { StartedApp } from '/domain/entities/App/Started'
export type { StoppedApp } from '/domain/entities/App/Stopped'

export default class extends App {
  constructor(options: {
    drivers: Partial<Drivers> & {
      database: (config: DatabaseConfig) => IDatabaseDriver
      monitor: (config: MonitorConfig[]) => IMonitorDriver
      server: (config: ServerConfig) => IServerDriver
      storage: (config: StorageConfig) => IStorageDriver
    }
    integrations?: Partial<Integrations>
    components?: Partial<Components>
    env?: Record<string, string | undefined>
  }) {
    const customDrivers = options?.drivers ?? {}
    const customIntegrations = options?.integrations ?? {}
    const customComponents = options?.components ?? {}
    const customEnv = options?.env ?? {}
    super(
      { ...drivers, ...customDrivers },
      { ...integrations, ...customIntegrations },
      { ...components, ...customComponents },
      { ...process.env, ...customEnv }
    )
  }
}
