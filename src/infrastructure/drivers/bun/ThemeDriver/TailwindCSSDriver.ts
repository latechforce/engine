import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import type { ThemeConfig } from '/domain/services/Theme'
import { $ } from 'bun'
import fs from 'fs-extra'
import { join } from 'path'

export class TailwindCSSDriver implements IThemeDriver {
  constructor(private _config: ThemeConfig) {}

  buildCss = async (): Promise<{ output: string; logs: string }> => {
    const { tmpDir = './tmp' } = this._config
    const input = `
      @import "tailwindcss";
      @import "preline/variants.css";
      
      @source "../node_modules/@latechforce/engine/dist"

      @plugin "@tailwindcss/forms";
    `
    const inputPath = join(tmpDir, 'input.css')
    const outputPath = join(tmpDir, 'output.css')
    await fs.writeFile(inputPath, input)
    const { stderr } = await $`bunx @tailwindcss/cli -i ${inputPath} -o ${outputPath}`.quiet()
    const output = await fs.readFile(outputPath, 'utf8')
    await fs.unlink(inputPath)
    await fs.unlink(outputPath)
    return { output, logs: stderr.toString() }
  }

  buildJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('preline/dist/preline.js'), 'utf8')
    return output
  }
}
