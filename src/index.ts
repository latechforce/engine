import { drivers } from '/infrastructure/drivers/common'
import { integrations } from '/infrastructure/integrations/common'
import { components } from '/infrastructure/components/tailwindcss'
import { Engine } from '/adapter/api'
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

export * from './types'

export default class extends Engine {
  constructor(options: {
    drivers: Partial<Drivers> & {
      database: (config: DatabaseConfig) => IDatabaseDriver
      monitor: (config: MonitorConfig[]) => IMonitorDriver
      server: (config: ServerConfig) => IServerDriver
      storage: (config: StorageConfig) => IStorageDriver
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
