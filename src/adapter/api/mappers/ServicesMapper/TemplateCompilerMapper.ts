import type { Drivers } from '../../../spi/drivers'
import { TemplateCompilerSpi } from '../../../spi/drivers/TemplateCompilerSpi'
import { TemplateCompiler } from '../../../../domain/services/TemplateCompiler'

export class TemplateCompilerMapper {
  static toService(drivers: Drivers): TemplateCompiler {
    const driver = drivers.templateCompiler()
    const spi = new TemplateCompilerSpi(driver)
    return new TemplateCompiler(spi)
  }
}
