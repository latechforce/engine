import type { ISystemSpi } from '/domain/services/System'

export interface ISystemDriver {
  fileExists: (path: string) => boolean
  getMimeType: (fileName: string) => string | null
  joinPath: (...paths: string[]) => string
  getEngineVersion: () => string
  getAppVersion: () => string
  formatDate: (date: Date, format: string) => string
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

  getEngineVersion = () => {
    return this._driver.getEngineVersion()
  }

  getAppVersion = () => {
    return this._driver.getAppVersion()
  }

  formatDate = (date: Date, format: string) => {
    return this._driver.formatDate(date, format)
  }
}
