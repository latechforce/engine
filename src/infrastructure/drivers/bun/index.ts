import type { Drivers } from '/adapter/spi/drivers'
import type { DatabaseConfig } from '/domain/services/Database'
import type { MonitorsConfig } from '/domain/services/Monitor'
import type { ServerConfig } from '/domain/services/Server'
import type { StorageConfig } from '/domain/services/Storage'

import { DatabaseDriver } from './DatabaseDriver'
import { MonitorDriver } from './MonitorDriver'
import { ServerDriver } from './ServerDriver'

import { drivers as common } from '../common'
import { StorageDriver } from './StorageDriver'

export const drivers: Drivers = {
  ...common,
  monitor: (config: MonitorsConfig) => new MonitorDriver(config),
  database: (config: DatabaseConfig) => new DatabaseDriver(config),
  server: (config: ServerConfig) => new ServerDriver(config),
  storage: (config: StorageConfig) => new StorageDriver(config),
}
