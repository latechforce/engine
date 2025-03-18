import type { Logger } from './Logger'
import type { IStorageSpi } from '/domain/services/Storage'
import type { File, FileToSave } from '../entities/File'

export interface StorageBucketConfig {
  name: string
}

export interface StorageBucketServices {
  logger: Logger
}

export interface IStorageBucketSpi {
  exists: () => Promise<boolean>
  create: () => Promise<void>
  save: (file: FileToSave) => Promise<void>
  readById: (id: string, endpoint: string) => Promise<File | undefined>
}

export class StorageBucket {
  readonly name: string
  private _bucket: IStorageBucketSpi

  constructor(
    spi: IStorageSpi,
    private _services: StorageBucketServices,
    config: StorageBucketConfig
  ) {
    const { name } = config
    this._bucket = spi.bucket(name)
    this.name = name
  }

  exists = async () => {
    return this._bucket.exists()
  }

  create = async () => {
    this._services.logger.debug(`creating ${this.name}...`)
    await this._bucket.create()
  }

  save = async (fileToSave: FileToSave, endpoint: string): Promise<File> => {
    this._services.logger.debug(`saving in bucket "${this.name}"`, fileToSave)
    await this._bucket.save(fileToSave)
    const file = await this.readByIdOrThrow(fileToSave.id, endpoint)
    return file
  }

  readById = async (id: string, endpoint: string) => {
    this._services.logger.debug(`read in bucket "${this.name}"`, { id })
    return this._bucket.readById(id, endpoint)
  }

  readByIdOrThrow = async (id: string, endpoint: string) => {
    const file = await this.readById(id, endpoint)
    if (!file) throw new Error(`file ${id} not found in bucket "${this.name}"`)
    return file
  }
}
