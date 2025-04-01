import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import fs from 'fs-extra'
import { join } from 'path'
import type { ThemeConfigTailwindCSS } from '/domain/services/Theme'

export class TailwindCSSDriver implements IThemeDriver {
  constructor(private _config: ThemeConfigTailwindCSS) {}

  buildCss = async (): Promise<string> => {
    const { base = './' } = this._config

    const path = (path: string) => join(process.cwd(), path)

    console.log(
      path('/node_modules/tailwindcss/index.css'),
      fs.existsSync(path('/node_modules/tailwindcss'))
    )
    console.log(
      path('/node_modules/preline/variants.css'),
      fs.existsSync(path('/node_modules/preline/variants.css'))
    )
    console.log(
      path('/node_modules/@latechforce/engine/dist'),
      fs.existsSync(path('/node_modules/@latechforce/engine/dist'))
    )
    console.log(
      path('/node_modules/@tailwindcss/forms'),
      fs.existsSync(path('/node_modules/@tailwindcss/forms'))
    )
    console.log(path(base), fs.existsSync(path(base)))

    const input = `
      @import "${path('/node_modules/tailwindcss/index.css')}";
      @import "${path('/node_modules/preline/variants.css')}";
      
      @source "${path('/node_modules/@latechforce/engine/dist')}";

      @plugin "${path('/node_modules/@tailwindcss/forms')}";
    `

    const result = await postcss([
      tailwindcss({
        base: path(base),
      }),
    ]).process(input, {
      from: undefined,
      to: undefined,
    })

    return result.css
  }

  buildJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    return output
  }
}
