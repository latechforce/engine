import type { IThemeSpi } from '/domain/services/Theme'

export interface IThemeDriver {
  buildCss: () => Promise<{ output: string; logs: string }>
  buildJs: () => Promise<string>
}

export class ThemeSpi implements IThemeSpi {
  constructor(private _driver: IThemeDriver) {}

  buildCss = async (): Promise<{ output: string; logs: string }> => {
    return this._driver.buildCss()
  }

  buildJs = async (): Promise<string> => {
    return this._driver.buildJs()
  }
}
