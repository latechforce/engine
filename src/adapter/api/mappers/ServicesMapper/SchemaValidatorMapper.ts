import type { Drivers } from '../../../spi/drivers'
import { SchemaValidatorSpi } from '../../../spi/drivers/SchemaValidatorSpi'
import { SchemaValidator } from '../../../../domain/services/SchemaValidator'

export class SchemaValidatorMapper {
  static toService(drivers: Drivers): SchemaValidator {
    const driver = drivers.schemaValidator()
    const spi = new SchemaValidatorSpi(driver)
    return new SchemaValidator(spi)
  }
}
