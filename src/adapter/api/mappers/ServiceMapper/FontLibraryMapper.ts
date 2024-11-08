import type { Drivers } from '@adapter/spi/drivers'
import { FontLibrarySpi } from '@adapter/spi/drivers/FontLibrarySpi'
import { FontLibrary, type Services } from '@domain/services/FontLibrary'

export class FontLibraryMapper {
  static toService(drivers: Drivers, services: Services): FontLibrary {
    const driver = drivers.fontLibrary()
    const spi = new FontLibrarySpi(driver)
    return new FontLibrary(spi, services)
  }
}
