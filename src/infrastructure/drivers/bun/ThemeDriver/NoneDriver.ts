import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'

export class NoneDriver implements IThemeDriver {
  constructor() {}

  buildCss = async (): Promise<{ output: string; logs: string }> => {
    return { output: '/* No css */', logs: 'No logs' }
  }

  buildJs = async (): Promise<string> => {
    return '// No js'
  }
}
