import { CssResponse } from '../entities/Response/Css'
import type { Server } from './Server'

export interface ThemeConfig {
  type: 'tailwindcss'
  tmpDir?: string
}

export interface ThemeServices {
  server: Server
}

export interface IThemeSpi {
  buildCss: () => Promise<string>
}

export class Theme {
  constructor(
    private _spi: IThemeSpi,
    private _services: ThemeServices
  ) {}

  init = async () => {
    const { server } = this._services
    const css = await this._spi.buildCss()
    await server.get('/output.css', async () => new CssResponse(css))
  }
}
