import type { Drivers } from '/adapter/spi/drivers'
import { SystemSpi } from '/adapter/spi/drivers/SystemSpi'
import { System } from '/domain/services/System'

export class SystemMapper {
  static toService(drivers: Drivers): System {
    const driver = drivers.system()
    const spi = new SystemSpi(driver)
    return new System(spi)
  }
}
