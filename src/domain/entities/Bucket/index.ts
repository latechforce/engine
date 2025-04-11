import type { Server } from '/domain/services/Server'
import type { GetRequest } from '/domain/entities/Request/Get'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { Storage } from '/domain/services/Storage'
import type { StorageBucket } from '/domain/services/StorageBucket'
import { JsonResponse } from '../Response/Json'
import { DocxResponse } from '../Response/Docx'
import { XlsxResponse } from '../Response/Xlsx'
import { PngResponse } from '../Response/Png'
import { PdfResponse } from '../Response/Pdf'
import type { FileProperties, FileToSave, File } from '../File'
import type { System } from '/domain/services/System'
import { JpgResponse } from '../Response/Jpg'
import { CsvResponse } from '../Response/Csv'
import { XlsResponse } from '../Response/Xls'
import { TxtResponse } from '../Response/Txt'
export interface BucketConfig {
  name: string
}

export interface BucketServices {
  server: Server
  storage: Storage
  idGenerator: IdGenerator
  templateCompiler: TemplateCompiler
  system: System
}

export class Bucket {
  name: string
  path: string
  filePath: string
  storage: StorageBucket

  constructor(
    _config: BucketConfig,
    private _services: BucketServices
  ) {
    const { storage, system } = this._services
    this.name = _config.name
    this.path = system.joinPath('/api/bucket', this.name)
    this.filePath = system.joinPath(this.path, ':id')
    this.storage = storage.bucket(this.name)
  }

  get endpoint(): string {
    const { server } = this._services
    return server.baseUrl + this.path
  }

  validate = async (): Promise<ConfigError[]> => {
    return []
  }

  init = async () => {
    const { server } = this._services
    await server.get(this.filePath, this.get)
  }

  save = async (fileProperties: FileProperties): Promise<File> => {
    const { idGenerator, system } = this._services
    const { name, data } = fileProperties
    const id = idGenerator.forFile()
    const created_at = new Date()
    const mime_type = system.getMimeType(name)
    let fileToSave: FileToSave
    if (data instanceof Buffer) {
      fileToSave = { id, name, data, created_at, mime_type }
    } else {
      fileToSave = { id, name, data: Buffer.from(data as string), created_at, mime_type }
    }
    const file = await this.storage.save(fileToSave, this.endpoint)
    return file
  }

  readById = async (id: string): Promise<File | undefined> => {
    const file = await this.storage.readById(id, this.endpoint)
    return file
  }

  get = async (request: GetRequest) => {
    const id = request.getParamOrThrow('id')
    const file = await this.storage.readById(id, this.endpoint)
    if (!file) return new JsonResponse({ status: 404, data: { message: 'file not found' } })
    switch (file.mime_type) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return new DocxResponse(file.name, file.data)
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return new XlsxResponse(file.name, file.data)
      case 'image/jpeg':
        return new JpgResponse(file.name, file.data)
      case 'image/png':
        return new PngResponse(file.name, file.data)
      case 'application/pdf':
        return new PdfResponse(file.name, file.data)
      case 'text/csv':
        return new CsvResponse(file.name, file.data)
      case 'application/vnd.ms-excel':
        return new XlsResponse(file.name, file.data)
      case 'text/plain':
        return new TxtResponse(file.name, file.data)
      default:
        return new JsonResponse({
          status: 404,
          data: { message: `can not return a ${file.name.split('.').pop()} file` },
        })
    }
  }
}
