import { inject, injectable } from 'inversify'
import type { IBucketRepository } from '@/bucket/domain/repository-interface/bucket-repository.interface'
import TYPES from '@/shared/application/di/types'
import type { Bucket } from '@/bucket/domain/entity/bucket.entity'
import type { BucketDatabaseService } from '../service/database.service'
import type { ServerService } from '@/shared/infrastructure/service'
import type { RouteConfig } from '@hono/zod-openapi'

@injectable()
export class BucketRepository implements IBucketRepository {
  constructor(
    @inject(TYPES.Bucket.Service.Database)
    private readonly database: BucketDatabaseService,
    @inject(TYPES.Service.Server)
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
