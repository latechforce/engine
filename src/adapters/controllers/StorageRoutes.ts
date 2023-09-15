import { RequestDto } from '@entities/services/server/RequestDto'
import { ApiRoute } from '@entities/services/server/IServerAdapter'
import { ApiError } from '@entities/errors/ApiError'
import { ResponseDto } from '@adapters/spi/server/dtos/ResponseDto'
import { StorageMiddleware } from '../validators/StorageMiddleware'
import { IStorageSpi } from '@adapters/services/storage/IStorageDriver'

export class StorageRoutes {
  private readonly storageMiddleware: StorageMiddleware

  constructor(storage: IStorageSpi) {
    this.storageMiddleware = new StorageMiddleware(storage)
  }

  get routes(): ApiRoute[] {
    return [
      {
        path: '/api/storage/:bucket/:filename',
        method: 'GET',
        handler: async (request: RequestDto) => this.get(request),
      },
    ]
  }

  async get(request: RequestDto): Promise<ResponseDto> {
    try {
      const file = await this.storageMiddleware.validateFileExist(request)
      return { file: file.path, headers: { 'Content-Type': file.mimetype } }
    } catch (error) {
      return this.catchError(error)
    }
  }

  catchError(error: unknown): ResponseDto {
    if (error instanceof ApiError) {
      return { status: error.status, json: { error: error.message } }
    } else if (error instanceof Error) {
      return { status: 500, json: { error: error.message } }
    } else {
      return { status: 500, json: { error: 'Internal server error' } }
    }
  }
}
