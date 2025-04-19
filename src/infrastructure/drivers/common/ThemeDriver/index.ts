import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import type { ThemeConfig } from '/domain/services/Theme'
import { TailwindCSSDriver } from './TailwindCSSDriver'
import { NoneDriver } from './NoneDriver'

export class ThemeDriver implements IThemeDriver {
  private _theme: IThemeDriver

  constructor(config: ThemeConfig) {
    const { type } = config
    switch (type) {
      case 'tailwindcss':
        this._theme = new TailwindCSSDriver(config)
        break
      case 'none':
        this._theme = new NoneDriver()
        break
      default:
        throw new Error(`Unsupported Theme driver: ${type}`)
    }
  }

  loadCssFiles = async (): Promise<{ name: string; content: string }[]> => {
    return this._theme.loadCssFiles()
  }

  loadJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    return this._theme.loadJsFiles()
  }

  icon = (icon: string): React.ReactNode => {
    return this._theme.icon(icon)
  }
}
