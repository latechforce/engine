import type { RouteConfig } from '@hono/zod-openapi'
import type { Bucket } from '../entity/bucket.entity'

export interface IBucketRepository {
  exists(bucket: Bucket): Promise<boolean>
  create(bucket: Bucket): Promise<void>
  addOpenAPIRoute(route: RouteConfig): void
}
