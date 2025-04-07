import type { ISystemDriver } from '/adapter/spi/drivers/SystemSpi'
import fs from 'fs-extra'
import path from 'path'
import mime from 'mime'

export class SystemDriver implements ISystemDriver {
  fileExists = (path: string) => {
    return fs.existsSync(path)
  }

  getMimeType = (fileName: string) => {
    return mime.getType(fileName)
  }

  joinPath = (...paths: string[]) => {
    return path.join(...paths)
  }
}
