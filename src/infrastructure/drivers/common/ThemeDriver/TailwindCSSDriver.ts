import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import fs from 'fs-extra'
import { join } from 'path'

export class TailwindCSSDriver implements IThemeDriver {
  constructor() {}

  buildCss = async (): Promise<string> => {
    const input = `
      @import "${join(process.cwd(), '/node_modules/tailwindcss')}";
      @import "${join(process.cwd(), '/node_modules/preline/variants.css')}";
      
      @source "${join(process.cwd(), '/node_modules/@latechforce/engine/dist')}";

      @plugin "${join(process.cwd(), '/node_modules/@tailwindcss/forms')}";
    `

    const result = await postcss([tailwindcss()]).process(input, {
      from: undefined,
      to: undefined,
    })

    if (result.messages.some((message) => message.type === 'error')) {
      const errors = result.messages
        .filter((message) => message.type === 'error')
        .map((message) => message.text)
        .join('\n')
      throw new Error(`PostCSS processing failed:\n${errors}`)
    }

    return result.css
  }

  buildJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    return output
  }
}
