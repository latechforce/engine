import fs from 'fs-extra'

export class ClientDriver {
  getJs = async (): Promise<string> => {
    const output = await fs.readFile(require.resolve('htmx.org/dist/htmx.js'), 'utf8')
    return output
  }
}
