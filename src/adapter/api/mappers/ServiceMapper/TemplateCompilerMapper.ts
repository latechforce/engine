import type { Drivers } from '@adapter/spi/Drivers'
import { TemplateCompilerSpi } from '@adapter/spi/TemplateCompilerSpi'
import { TemplateCompiler } from '@domain/services/TemplateCompiler'

interface Ressources {
  drivers: Drivers
}

export class TemplateCompilerMapper {
  static toService(ressources: Ressources): TemplateCompiler {
    const { drivers } = ressources
    const driver = drivers.templateCompiler()
    const spi = new TemplateCompilerSpi(driver)
    return new TemplateCompiler(spi)
  }
}
