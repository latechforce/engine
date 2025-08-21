import type { IBucketRepository } from '../../domain/repository-interface/bucket-repository.interface'
import type { Bucket } from '../../domain/entity/bucket.entity'
import type { BucketDatabaseService } from '../service/database.service'
import type { ServerService } from '../../../../shared/infrastructure/service'
import type { RouteConfig } from '@hono/zod-openapi'

export class BucketRepository implements IBucketRepository {
  constructor(
    private readonly database: BucketDatabaseService,

    private readonly server: ServerService
  ) {}

  async exists(bucket: Bucket): Promise<boolean> {
    const result = await this.database.bucket.get(bucket.schema.id)
    return result !== undefined
  }

  async create(bucket: Bucket): Promise<void> {
    await this.database.bucket.create({
      id: bucket.schema.id,
      name: bucket.schema.name,
      created_at: new Date(),
    })
  }

  addOpenAPIRoute(route: RouteConfig): void {
    this.server.addOpenAPIRoute(route)
  }
}
