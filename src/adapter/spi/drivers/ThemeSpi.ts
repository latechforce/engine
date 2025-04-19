import type { IThemeSpi } from '/domain/services/Theme'

export interface IThemeDriver {
  loadCssFiles: () => Promise<{ name: string; content: string }[]>
  loadJsFiles: () => Promise<{ name: string; content: string }[]>
  icon: (icon: string) => React.ReactNode
}

export class ThemeSpi implements IThemeSpi {
  constructor(private _driver: IThemeDriver) {}

  loadCssFiles = async (): Promise<{ name: string; content: string }[]> => {
    return this._driver.loadCssFiles()
  }

  loadJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    return this._driver.loadJsFiles()
  }

  icon = (icon: string): React.ReactNode => {
    return this._driver.icon(icon)
  }
}
