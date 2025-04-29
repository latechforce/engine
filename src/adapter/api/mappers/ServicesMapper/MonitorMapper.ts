import type { MonitorServiceSchema } from '../../schemas/ServiceSchema/MonitorSchema'
import type { Drivers } from '../../../spi/drivers'
import { MonitorSpi } from '../../../spi/drivers/MonitorSpi'
import { Monitor } from '../../../../domain/services/Monitor'
import type { MonitorServices } from '../../../../domain/services/Monitor'
export class MonitorMapper {
  static toService(
    drivers: Drivers,
    schema: MonitorServiceSchema[] = [],
    services: MonitorServices,
    { appName, appVersion }: { appName: string; appVersion: string }
  ): Monitor {
    const monitors = schema.map((schema) => ({ ...schema, appName, appVersion }))
    const driver = drivers.monitor(monitors)
    const spi = new MonitorSpi(driver)
    return new Monitor(spi, monitors, services)
  }
}
