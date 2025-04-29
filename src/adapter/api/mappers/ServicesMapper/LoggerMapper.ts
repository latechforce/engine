import type { Drivers } from '../../../spi/drivers'
import { LoggerSpi } from '../../../spi/drivers/LoggerSpi'
import { Logger } from '../../../../domain/services/Logger'
import type { LoggerServiceSchema } from '../../schemas/ServiceSchema/LoggerSchema'

export class LoggerMapper {
  static toService(
    drivers: Drivers,
    config: LoggerServiceSchema[] = [{ type: 'Console' }]
  ): Logger {
    const driver = drivers.logger(config)
    const spi = new LoggerSpi(driver)
    return new Logger(spi)
  }
}
