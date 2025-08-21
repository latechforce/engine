import type { App } from '../../../../features/app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IObjectRepository } from '../../domain/repository-interface/object-repository.interface'
import { toListObjectsDto, type ListObjectsDto } from '../dto/list-objects.dto'

export class ListObjectsUseCase {
  constructor(private readonly objectRepository: IObjectRepository) {}

  async execute(app: App, bucketId: string): Promise<ListObjectsDto> {
    const bucket = app.findBucket(bucketId)
    if (!bucket) {
      throw new HttpError('Bucket not found', 404)
    }

    const objects = await this.objectRepository.listByBucketId(bucket.schema.id)
    return toListObjectsDto(objects)
  }
}
