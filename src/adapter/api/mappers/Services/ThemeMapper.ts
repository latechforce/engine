import type { ThemeServiceSchema } from '../../schemas/ServiceSchema/ThemeSchema'
import type { Drivers } from '/adapter/spi/drivers'
import { ThemeSpi } from '/adapter/spi/drivers/ThemeSpi'
import { Theme, type ThemeServices } from '/domain/services/Theme'

export class ThemeMapper {
  static toService(
    drivers: Drivers,
    services: ThemeServices,
    schema: ThemeServiceSchema = { type: 'tailwindcss' }
  ): Theme {
    const driver = drivers.theme(schema)
    const spi = new ThemeSpi(driver)
    return new Theme(spi, services, schema)
  }
}
