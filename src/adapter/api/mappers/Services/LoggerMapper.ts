import type { Drivers } from '/adapter/spi/drivers'
import { LoggerSpi } from '/adapter/spi/drivers/LoggerSpi'
import { Logger } from '/domain/services/Logger'
import type { LoggerServiceSchema } from '../../schemas/ServiceSchema/LoggerSchema'

export class LoggerMapper {
  static toService(
    drivers: Drivers,
    config: LoggerServiceSchema[] = [{ driver: 'Console' }]
  ): Logger {
    const driver = drivers.logger(config)
    const spi = new LoggerSpi(driver)
    return new Logger(spi)
  }
}
