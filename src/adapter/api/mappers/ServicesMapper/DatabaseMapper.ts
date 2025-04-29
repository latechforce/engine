import type { DatabaseServiceSchema } from '../../schemas/ServiceSchema/DatabaseSchema'
import type { Drivers } from '../../../spi/drivers'
import { DatabaseSpi } from '../../../spi/drivers/DatabaseSpi'
import { Database, type DatabaseServices } from '../../../../domain/services/Database'

export class DatabaseMapper {
  static toService(
    drivers: Drivers,
    schema: DatabaseServiceSchema = { url: `:memory:`, type: 'SQLite' },
    services: DatabaseServices
  ): Database {
    const driver = drivers.database(schema)
    const spi = new DatabaseSpi(driver)
    return new Database(spi, services, schema)
  }
}
