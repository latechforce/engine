import { CssResponse } from '../entities/Response/Css'
import { JsResponse } from '../entities/Response/Js'
import type { Server } from './Server'
import type { Logger } from './Logger'

export interface ThemeConfig {
  type: 'tailwindcss'
  tmpDir?: string
}

export interface ThemeServices {
  server: Server
  logger: Logger
}

export interface IThemeSpi {
  buildCss: () => Promise<{ output: string; logs: string }>
  buildJs: () => Promise<string>
}

export class Theme {
  constructor(
    private _spi: IThemeSpi,
    private _services: ThemeServices,
    private _config: ThemeConfig
  ) {}

  init = async () => {
    const { server, logger } = this._services
    const { output: css, logs } = await this._spi.buildCss()
    const js = await this._spi.buildJs()
    await server.get('/style.css', async () => new CssResponse(css))
    await server.get('/style.js', async () => new JsResponse(js))
    logger.debug(`init theme with "${this._config.type}"\n${logs}`.trim())
  }
}
