import { CssResponse } from '../entities/Response/Css'
import { JsResponse } from '../entities/Response/Js'
import type { Server } from './Server'
import type { Logger } from './Logger'

export interface ThemeConfigNone {
  type: 'none'
}

export interface ThemeConfigTailwindCSS {
  type: 'tailwindcss'
  base?: string
}

export type ThemeConfig = ThemeConfigNone | ThemeConfigTailwindCSS

export interface ThemeServices {
  server: Server
  logger: Logger
}

export interface IThemeSpi {
  loadCssFiles: () => Promise<{ name: string; content: string }[]>
  loadJsFiles: () => Promise<{ name: string; content: string }[]>
  icon: (icon: string) => React.ReactNode
}

export class Theme {
  timestamp: string
  jsFiles: string[] = []
  cssFiles: string[] = []

  constructor(
    private _spi: IThemeSpi,
    private _services: ThemeServices,
    public config: ThemeConfig
  ) {
    this.timestamp = Date.now().toString()
  }

  init = async () => {
    const { server, logger } = this._services
    logger.debug(`init theme with "${this.config.type}"`)
    const cssFiles = await this._spi.loadCssFiles()
    for (const cssFile of cssFiles) {
      const path = `/${cssFile.name}`
      this.cssFiles.push(path + `?ts=${this.timestamp}`)
      await server.get(path, async () => new CssResponse(cssFile.content))
    }
    const jsFiles = await this._spi.loadJsFiles()
    for (const jsFile of jsFiles) {
      const path = `/${jsFile.name}`
      this.jsFiles.push(path + `?ts=${this.timestamp}`)
      await server.get(path, async () => new JsResponse(jsFile.content))
    }
    logger.debug(`theme initialized with timestamp ${this.timestamp}`)
  }

  icon = (icon: string): React.ReactNode => {
    return this._spi.icon(icon)
  }
}
