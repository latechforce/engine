import type { Context } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'

export class BucketController {
  static async listObjects(c: Context<HonoType>) {
    const app = c.get('app')
    const bucketId = c.req.param('bucketId')
    const listObjectsUseCase = c.get('listObjectsUseCase')
    const listObjectsDto = await listObjectsUseCase.execute(app, bucketId)
    return c.json(listObjectsDto, 200)
  }

  static async uploadObject(c: Context<HonoType>) {
    const app = c.get('app')
    const bucketId = c.req.param('bucketId')
    const key = c.req.param('key')
    const uploadObjectUseCase = c.get('uploadObjectUseCase')
    const result = await uploadObjectUseCase.execute(app, bucketId, key, c.req.raw)
    return c.text(result, 201)
  }

  static async downloadObject(c: Context<HonoType>) {
    const app = c.get('app')
    const bucketId = c.req.param('bucketId')
    const key = c.req.param('key')
    const downloadObjectUseCase = c.get('downloadObjectUseCase')
    const object = await downloadObjectUseCase.execute(app, bucketId, key)
    return new Response(object.data, {
      status: 200,
      headers: {
        'Content-Type': object.contentType || 'application/octet-stream',
        'Content-Length': object.size?.toString() || '0',
      },
    })
  }

  static async deleteObject(c: Context<HonoType>) {
    const app = c.get('app')
    const bucketId = c.req.param('bucketId')
    const key = c.req.param('key')
    const deleteObjectUseCase = c.get('deleteObjectUseCase')
    const result = await deleteObjectUseCase.execute(app, bucketId, key)
    return c.text(result, 200)
  }
}
