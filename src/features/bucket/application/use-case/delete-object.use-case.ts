import type { App } from '@/app/domain/entity/app.entity'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { HttpError } from '@/shared/domain/entity/http-error.entity'
import type { IObjectRepository } from '@/bucket/domain/repository-interface/object-repository.interface'

@injectable()
export class DeleteObjectUseCase {
  constructor(
    @inject(TYPES.Repository.Object)
    private readonly objectRepository: IObjectRepository
  ) {}

  async execute(app: App, bucketId: string, key: string): Promise<string> {
    const bucket = app.findBucket(bucketId)
    if (!bucket) {
      throw new HttpError('Bucket not found', 404)
    }

    const object = await this.objectRepository.get(bucket.schema.id, key)
    if (!object) {
      throw new HttpError('Object not found', 404)
    }

    await this.objectRepository.delete(bucket.schema.id, key)

    return 'Object deleted'
  }
}
