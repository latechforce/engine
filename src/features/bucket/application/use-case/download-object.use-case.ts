import type { App } from '../../../../features/app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IObjectRepository } from '../../domain/repository-interface/object-repository.interface'
import { Object } from '../../domain/entity/object.entity'

export class DownloadObjectUseCase {
  constructor(private readonly objectRepository: IObjectRepository) {}

  async execute(app: App, bucketId: string, key: string): Promise<Object> {
    const bucket = app.findBucket(bucketId)
    if (!bucket) {
      throw new HttpError('Bucket not found', 404)
    }

    const object = await this.objectRepository.get(bucket.schema.id, key)
    if (!object) {
      throw new HttpError('Object not found', 404)
    }

    return object
  }
}
