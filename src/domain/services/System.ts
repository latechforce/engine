export interface ISystemSpi {
  fileExists: (path: string) => boolean
  getMimeType: (path: string) => string | null
  joinPath: (...paths: string[]) => string
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
}
