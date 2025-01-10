import type { Drivers } from '@adapter/spi/drivers'
import type { DatabaseConfig } from '@domain/services/Database'

import { DatabaseDriver } from './DatabaseDriver'

export const drivers: Partial<Drivers> = {
  database: (config: DatabaseConfig) => new DatabaseDriver(config),
}
