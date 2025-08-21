import type { App } from '../../../../features/app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IObjectRepository } from '../../domain/repository-interface/object-repository.interface'
import { Object } from '../../domain/entity/object.entity'

export class UploadObjectUseCase {
  constructor(private readonly objectRepository: IObjectRepository) {}

  async execute(app: App, bucketId: string, key: string, req: Request): Promise<string> {
    const bucket = app.findBucket(bucketId)
    if (!bucket) {
      throw new HttpError('Bucket not found', 404)
    }

    const data = await req.arrayBuffer()
    const object = new Object(
      key,
      bucket.schema.id,
      new Uint8Array(data),
      req.headers.get('content-type') || this.objectRepository.getMimeType(key),
      data.byteLength
    )
    const exists = await this.objectRepository.exists(bucket.schema.id, key)

    if (exists) {
      await this.objectRepository.update(object)
    } else {
      await this.objectRepository.create(object)
    }

    return 'Object uploaded'
  }
}
