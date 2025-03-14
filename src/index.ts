import { drivers } from '/infrastructure/drivers/common'
import { integrations } from '/infrastructure/integrations/common'
import { components } from '/infrastructure/components'
import App from '/adapter/api'
import type { Drivers } from '/adapter/spi/drivers'
import type { Integrations } from '/adapter/spi/integrations'
import type { Components } from '/adapter/spi/components'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import type { DatabaseConfig } from '/domain/services/Database'
import type { MonitorsConfig } from './domain/services/Monitor'
import type { IMonitorDriver } from './adapter/spi/drivers/MonitorSpi'
import type { ServerConfig } from './domain/services/Server'
import type { IServerDriver } from './adapter/spi/drivers/ServerSpi'

export type { Config } from '/domain/interfaces'
export type { IAutomation as Automation } from '/domain/interfaces/IAutomation'
export type { IAction as Action } from '/domain/interfaces/IAction'
export type { ITrigger as Trigger } from '/domain/interfaces/ITrigger'
export type { ITable as Table } from '/domain/interfaces/ITable'
export type { IField as Field } from '/domain/interfaces/IField'
export type { FilterConfig as Filter } from '/domain/entities/Filter'
export type { IBucket as Bucket } from '/domain/interfaces/IBucket'
export type {
  DatabaseConfig as Database,
  LoggersConfig as Loggers,
  MonitorsConfig as Monitors,
  ServerConfig as Server,
  TunnelConfig as Tunnel,
} from '/domain/interfaces/IServices'
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
} from '/domain/integrations/Notion/NotionTablePage'
export type { NotionUser } from '/domain/integrations/Notion/NotionUser'
export type { NotionTablePageDto } from '/adapter/spi/dtos/NotionTablePageDto'
export {
  AirtableTableRecord,
  type AirtableTableRecordFields,
  type AirtableTableRecordFieldValue,
  type ConvertToAirtableTableRecordFields,
} from '/domain/integrations/Airtable/AirtableTableRecord'
export type { AirtableTableRecordDto } from '/adapter/spi/dtos/AirtableTableRecordDto'
export {
  type QontoCreateClient,
  type QontoClient,
  type QontoCreateClientInvoice,
  type QontoClientInvoice,
  type QontoAttachment,
} from '/domain/integrations/Qonto'
export {
  Record as DatabaseTableRecord,
  type RecordFields as DatabaseTableRecordFields,
  type RecordFieldValue as DatabaseTableRecordFieldValue,
  type UpdateRecordFields as DatabaseTableUpdateRecordFields,
} from '/domain/entities/Record'
export type { AppIntegrations } from '/domain/entities/App/Base'
export type { StartedApp } from '/domain/entities/App/Started'
export type { StoppedApp } from '/domain/entities/App/Stopped'

export default class extends App {
  constructor(options: {
    drivers: Partial<Drivers> & {
      database: (config: DatabaseConfig) => IDatabaseDriver
      monitor: (config: MonitorsConfig) => IMonitorDriver
      server: (config: ServerConfig) => IServerDriver
    }
    integrations?: Partial<Integrations>
    components?: Partial<Components>
  }) {
    const customDrivers = options?.drivers ?? {}
    const customIntegrations = options?.integrations ?? {}
    const customComponents = options?.components ?? {}
    super(
      { ...drivers, ...customDrivers },
      { ...integrations, ...customIntegrations },
      { ...components, ...customComponents }
    )
  }
}
