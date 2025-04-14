import type { ConfigSchema } from '../../schemas/ConfigSchema'
import type { MonitorServiceSchema } from '../../schemas/ServiceSchema/MonitorSchema'
import type { Drivers } from '/adapter/spi/drivers'
import { MonitorSpi } from '/adapter/spi/drivers/MonitorSpi'
import { Monitor } from '/domain/services/Monitor'
import type { MonitorServices } from '/domain/services/Monitor'
export class MonitorMapper {
  static toService(
    drivers: Drivers,
    schema: MonitorServiceSchema[] = [],
    services: MonitorServices,
    config: ConfigSchema
  ): Monitor {
    const { name: appName, version: appVersion } = config
    const monitors = schema.map((schema) => ({ ...schema, appName, appVersion }))
    const driver = drivers.monitor(monitors)
    const spi = new MonitorSpi(driver)
    return new Monitor(spi, monitors, services)
  }
}
