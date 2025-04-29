import type { Drivers } from '../../../spi/drivers'
import { IdGeneratorSpi } from '../../../spi/drivers/IdGeneratorSpi'
import { IdGenerator } from '../../../../domain/services/IdGenerator'

export class IdGeneratorMapper {
  static toService(drivers: Drivers): IdGenerator {
    const driver = drivers.idGenerator()
    const spi = new IdGeneratorSpi(driver)
    return new IdGenerator(spi)
  }
}
