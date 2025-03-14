import type { IThemeDriver } from '/adapter/spi/drivers/ThemeSpi'
import type { ThemeConfig } from '/domain/services/Theme'
import { $ } from 'bun'
import fs from 'fs-extra'

export class ThemeDriver implements IThemeDriver {
  constructor(private _config: ThemeConfig) {}

  buildCss = async (): Promise<string> => {
    const { type } = this._config
    switch (type) {
      case 'tailwindcss':
        return this.buildTailwindCss()
      default:
        throw new Error(`Unsupported driver: ${type}`)
    }
  }

  buildTailwindCss = async (): Promise<string> => {
    const { tmpDir = './tmp' } = this._config
    const input = `
      @import "tailwindcss";
    `
    const inputPath = `${tmpDir}/input.css`
    const outputPath = `${tmpDir}/output.css`
    await fs.writeFile(inputPath, input)
    await $`bunx @tailwindcss/cli -i ${inputPath} -o ${outputPath}`.quiet()
    const output = await fs.readFile(outputPath, 'utf8')
    return output
  }
}
