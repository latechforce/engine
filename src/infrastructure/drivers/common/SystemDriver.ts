import type { ISystemDriver } from '/adapter/spi/drivers/SystemSpi'
import fs from 'fs-extra'
import path from 'path'
import mime from 'mime'

type PackageJson = {
  version: string
  dependencies: Record<string, string>
}

export class SystemDriver implements ISystemDriver {
  private _packageJson: PackageJson

  constructor() {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    this._packageJson = fs.readJSONSync(packageJsonPath)
  }
  fileExists = (path: string) => {
    return fs.existsSync(path)
  }

  getMimeType = (fileName: string) => {
    return mime.getType(fileName)
  }

  joinPath = (...paths: string[]) => {
    return path.join(...paths)
  }

  getAppVersion = () => {
    return this._packageJson.version ?? 'latest'
  }

  getEngineVersion = () => {
    return this._packageJson.dependencies['@latechforce/engine']?.replace('^', '') ?? 'latest'
  }
}
