import type { ISystemSpi } from '/domain/services/System'

export interface ISystemDriver {
  fileExists: (path: string) => boolean
  getMimeType: (fileName: string) => string | null
  joinPath: (...paths: string[]) => string
}

export class SystemSpi implements ISystemSpi {
  constructor(private _driver: ISystemDriver) {}

  fileExists = (path: string) => {
    return this._driver.fileExists(path)
  }

  getMimeType = (fileName: string) => {
    return this._driver.getMimeType(fileName)
  }

  joinPath = (...paths: string[]) => {
    return this._driver.joinPath(...paths)
  }
}
