import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import fs from 'fs-extra'
import { join } from 'path'
import type { ThemeConfigTailwindCSS } from '/domain/services/Theme'

export class TailwindCSSDriver implements IThemeDriver {
  constructor(private _config: ThemeConfigTailwindCSS) {}

  loadCssFiles = async (): Promise<{ name: string; content: string }[]> => {
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

      return [{ name: 'tailwind.css', content: result.css }]
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  loadJsFiles = async (): Promise<{ name: string; content: string }[]> => {
    const prelineJs = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    const lucideJs = await fs.readFile(require.resolve('lucide/dist/umd/lucide.min.js'), 'utf8')
    const loadJs = `
      document.addEventListener('DOMContentLoaded', function () {
        lucide.createIcons()
      })
    `
    return [
      { name: 'preline.js', content: prelineJs },
      { name: 'lucide.min.js', content: lucideJs },
      { name: 'load.js', content: loadJs },
    ]
  }

  icon = (icon: string): React.ReactNode => {
    return <i data-lucide={icon}></i>
  }
}
