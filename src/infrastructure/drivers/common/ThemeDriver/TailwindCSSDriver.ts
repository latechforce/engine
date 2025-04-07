import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import fs from 'fs-extra'
import { join } from 'path'
import type { ThemeConfigTailwindCSS } from '/domain/services/Theme'

export class TailwindCSSDriver implements IThemeDriver {
  constructor(private _config: ThemeConfigTailwindCSS) {}

  buildCss = async (): Promise<string> => {
    const { base = './src' } = this._config

    const path = (path: string) => join(process.cwd(), path)

    const input = `
      @import "${path('/node_modules/tailwindcss/index.css')}";
      @import "${path('/node_modules/preline/variants.css')}";
      
      @source "${path('/node_modules/@latechforce/engine/dist')}";

      @plugin "${path('/node_modules/@tailwindcss/forms')}";
    `

    try {
      const result = await postcss([
        tailwindcss({
          base: path(base),
        }),
      ]).process(input, {
        from: undefined,
        to: undefined,
      })

      return result.css
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  buildJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    return output
  }
}
