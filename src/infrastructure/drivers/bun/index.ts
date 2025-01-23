import type { Drivers } from '@adapter/spi/drivers'
import type { DatabaseConfig } from '@domain/services/Database'

import { DatabaseDriver } from './DatabaseDriver'

import { drivers as common } from '../common'

export const drivers: Drivers = {
  ...common,
  database: (config: DatabaseConfig) => new DatabaseDriver(config),
}
