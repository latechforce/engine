import type { Drivers } from '/adapter/spi/drivers'
import type { DatabaseConfig } from '/domain/services/Database'
import type { MonitorsConfig } from '/domain/services/Monitor'

import { DatabaseDriver } from './DatabaseDriver'
import { MonitorDriver } from './MonitorDriver'

import { drivers as common } from '../common'

export const drivers: Drivers = {
  ...common,
  monitor: (config: MonitorsConfig) => new MonitorDriver(config),
  database: (config: DatabaseConfig) => new DatabaseDriver(config),
}
