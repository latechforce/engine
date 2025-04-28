export interface ISystemSpi {
  fileExists: (path: string) => boolean
  getMimeType: (path: string) => string | null
  joinPath: (...paths: string[]) => string
  getEngineVersion: () => string
  getAppVersion: () => string
  formatDate: (date: Date, format: string) => string
}

export class System {
  constructor(private _spi: ISystemSpi) {}

  fileExists = (path: string): boolean => {
    return this._spi.fileExists(path)
  }

  getMimeType = (fileName: string): string => {
    const mimeType = this._spi.getMimeType(fileName)
    if (!mimeType) {
      throw new Error(`Mime type not found for file ${fileName}`)
    }
    return mimeType
  }

  joinPath = (...paths: string[]): string => {
    return this._spi.joinPath(...paths)
  }

  getEngineVersion = (): string => {
    return this._spi.getEngineVersion()
  }

  getAppVersion = (): string => {
    return this._spi.getAppVersion()
  }

  capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  formatDate = (date: Date, format: string) => {
    return this._spi.formatDate(date, format)
  }
}
