import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import fs from 'fs-extra'
import { join } from 'path'
import type { ThemeConfigTailwindCSS } from '/domain/services/Theme'
import * as Icons from 'lucide-react'

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
    const loadJs = `
      htmx.on("htmx:afterSwap", function(evt) {
        window.HSStaticMethods?.autoInit?.();
      });
    `
    return [
      { name: 'preline.js', content: prelineJs },
      { name: 'load.js', content: loadJs },
    ]
  }

  icon = (name: string): React.ReactNode => {
    const iconName = name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\s/g, '')
    const Icon = Icons[iconName as keyof typeof Icons] || Icons['HelpCircle']
    // @ts-expect-error - lucide-react is not typed
    return <Icon />
  }
}
