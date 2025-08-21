import type { BucketDatabaseService } from '../service/database.service'
import type { IObjectRepository } from '../../domain/repository-interface/object-repository.interface'
import { Object } from '../../domain/entity/object.entity'
import mime from 'mime-types'

export class ObjectRepository implements IObjectRepository {
  constructor(private readonly database: BucketDatabaseService) {}

  getMimeType(fileName: string): string {
    const mimeType = mime.lookup(fileName)
    return mimeType === false ? 'application/octet-stream' : mimeType
  }

  async exists(bucketId: number, key: string): Promise<boolean> {
    const result = await this.database.object.get(bucketId, key)
    return result !== undefined
  }

  async create(object: Object): Promise<void> {
    await this.database.object.create({
      id: object.id,
      bucket_id: object.bucketId,
      key: object.key,
      data: Buffer.from(object.data),
      content_type: object.contentType,
      size: object.size,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }

  async update(object: Object): Promise<void> {
    await this.database.object.update(object.bucketId, object.key, {
      data: Buffer.from(object.data),
      content_type: object.contentType,
      size: object.size,
      updated_at: new Date(),
    })
  }

  async get(bucketId: number, key: string): Promise<Object | null> {
    const object = await this.database.object.get(bucketId, key)
    if (!object) {
      return null
    }
    return new Object(
      object.key,
      object.bucket_id,
      object.data,
      object.content_type,
      object.size,
      object.id,
      object.created_at,
      object.updated_at
    )
  }

  async listByBucketId(bucketId: number): Promise<Object[]> {
    const objects = await this.database.object.listByBucketId(bucketId)
    return objects.map(
      (object) =>
        new Object(
          object.key,
          object.bucket_id,
          object.data,
          object.content_type,
          object.size,
          object.id,
          object.created_at,
          object.updated_at
        )
    )
  }

  async delete(bucketId: number, key: string): Promise<void> {
    await this.database.object.delete(bucketId, key)
  }
}
