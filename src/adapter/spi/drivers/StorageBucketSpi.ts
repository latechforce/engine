import type { IStorageBucketSpi } from '/domain/services/StorageBucket'
import type { FileDto } from '../dtos/FileDto'
import { FileMapper } from '../mappers/FileMapper'
import type { FileToSave } from '/domain/entities/File'

export interface IStorageBucketDriver {
  exists: () => Promise<boolean>
  create: () => Promise<void>
  save: (data: FileDto) => Promise<void>
  readById: (id: string) => Promise<FileDto | undefined>
}

export class StorageBucketSpi implements IStorageBucketSpi {
  constructor(private _driver: IStorageBucketDriver) {}

  exists = async () => {
    return this._driver.exists()
  }

  create = async () => {
    await this._driver.create()
  }

  save = async (fileToSave: FileToSave) => {
    const fileDto = FileMapper.toDto(fileToSave)
    await this._driver.save(fileDto)
  }

  readById = async (id: string, endpoint: string) => {
    const fileDto = await this._driver.readById(id)
    if (!fileDto) return
    return FileMapper.toEntity(fileDto, endpoint)
  }
}
