import { Hono } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'
import { BucketController } from './controller/bucket.controller'

export const bucketRoutes = new Hono<HonoType>()
  .get('/:bucketId', BucketController.listObjects)
  .put('/:bucketId/:key', BucketController.uploadObject)
  .get('/:bucketId/:key', BucketController.downloadObject)
  .delete('/:bucketId/:key', BucketController.deleteObject)

export type BucketType = typeof bucketRoutes
