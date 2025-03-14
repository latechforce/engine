import { CssResponse } from '../entities/Response/Css'
import { JsResponse } from '../entities/Response/Js'
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
  buildJs: () => Promise<string>
}

export class Theme {
  constructor(
    private _spi: IThemeSpi,
    private _services: ThemeServices
  ) {}

  init = async () => {
    const { server } = this._services
    const css = await this._spi.buildCss()
    const js = await this._spi.buildJs()
    await server.get('/style.css', async () => new CssResponse(css))
    await server.get('/style.js', async () => new JsResponse(js))
  }
}
