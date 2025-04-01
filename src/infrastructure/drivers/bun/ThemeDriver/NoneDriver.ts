import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'

export class NoneDriver implements IThemeDriver {
  constructor() {}

  buildCss = async (): Promise<string> => {
    return '/* No css */'
  }

  buildJs = async (): Promise<string> => {
    return '// No js'
  }
}
