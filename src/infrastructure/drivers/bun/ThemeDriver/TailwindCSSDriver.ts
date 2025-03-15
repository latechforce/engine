import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import type { ThemeConfig } from '/domain/services/Theme'
import { $ } from 'bun'
import fs from 'fs-extra'
import { join } from 'path'

export class TailwindCSSDriver implements IThemeDriver {
  constructor(private _config: ThemeConfig) {}

  buildCss = async (): Promise<string> => {
    const { tmpDir = './tmp' } = this._config
    const input = `
      @import "tailwindcss";
      @import "preline/variants.css";
    `
    const inputPath = join(tmpDir, 'input.css')
    const outputPath = join(tmpDir, 'output.css')
    await fs.writeFile(inputPath, input)
    await $`bunx @tailwindcss/cli -i ${inputPath} -o ${outputPath}`.quiet()
    const output = await fs.readFile(outputPath, 'utf8')
    return output
  }

  buildJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    return output
  }
}
