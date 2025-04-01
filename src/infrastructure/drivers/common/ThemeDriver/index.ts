import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import type { ThemeConfig } from '/domain/services/Theme'
import { TailwindCSSDriver } from './TailwindCSSDriver'
import { NoneDriver } from './NoneDriver'

export class ThemeDriver implements IThemeDriver {
  private _driver: IThemeDriver

  constructor(config: ThemeConfig) {
    const { type } = config
    switch (type) {
      case 'tailwindcss':
        this._driver = new TailwindCSSDriver()
        break
      case 'none':
        this._driver = new NoneDriver()
        break
      default:
        throw new Error(`Unsupported Theme driver: ${type}`)
    }
  }

  buildCss = async (): Promise<string> => {
    return this._driver.buildCss()
  }

  buildJs = async (): Promise<string> => {
    return this._driver.buildJs()
  }
}
