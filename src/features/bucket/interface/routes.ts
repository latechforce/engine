import { Hono } from 'hono'
import type { HonoType } from '../../../shared/infrastructure/service'
import { BucketController } from './controller/bucket.controller'

export const bucketRoutes = new Hono<HonoType>()
  .get('/:bucketId', (c) => BucketController.listObjects(c, { bucketId: c.req.param('bucketId') }))
  .put('/:bucketId/:key', (c) =>
    BucketController.uploadObject(c, { bucketId: c.req.param('bucketId'), key: c.req.param('key') })
  )
  .get('/:bucketId/:key', (c) =>
    BucketController.downloadObject(c, {
      bucketId: c.req.param('bucketId'),
      key: c.req.param('key'),
    })
  )
  .delete('/:bucketId/:key', (c) =>
    BucketController.deleteObject(c, { bucketId: c.req.param('bucketId'), key: c.req.param('key') })
  )

export type BucketType = typeof bucketRoutes
