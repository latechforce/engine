import type { Drivers } from '/adapter/spi/drivers'
import { CronSpi } from '/adapter/spi/drivers/CronSpi'
import { Cron } from '/domain/services/Cron'

export class CronMapper {
  static toService(drivers: Drivers): Cron {
    const driver = drivers.cron()
    const spi = new CronSpi(driver)
    return new Cron(spi)
  }
}
