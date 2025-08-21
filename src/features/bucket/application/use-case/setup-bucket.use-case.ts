import type { IBucketRepository } from '../../domain/repository-interface/bucket-repository.interface'
import type { Bucket } from '../../domain/entity/bucket.entity'
import { join } from 'path'
import { z } from 'zod'
import { listObjectsDto } from '../dto/list-objects.dto'

export class SetupBucketUseCase {
  constructor(private readonly bucketRepository: IBucketRepository) {}

  async execute(bucket: Bucket) {
    const exists = await this.bucketRepository.exists(bucket)
    if (!exists) {
      await this.bucketRepository.create(bucket)
    }

    if (bucket.schema.name === 'default' || bucket.schema.id === 0) {
      return
    }

    this.bucketRepository.addOpenAPIRoute({
      summary: 'Upload object',
      method: 'put',
      path: '/' + join('buckets', bucket.schema.name, '{key}'),
      description: `Upload an object to the bucket "${bucket.schema.name}"`,
      tags: [`Bucket "${bucket.schema.name}"`],
      responses: {
        201: {
          description: 'The object was uploaded successfully',
        },
        404: {
          description: 'The bucket was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.literal('Bucket not found'),
              }),
            },
          },
        },
      },
    })

    this.bucketRepository.addOpenAPIRoute({
      summary: 'List objects',
      method: 'get',
      path: '/' + join('buckets', bucket.schema.name),
      description: `List objects in the bucket "${bucket.schema.name}"`,
      tags: [`Bucket "${bucket.schema.name}"`],
      responses: {
        200: {
          description: 'The objects were listed successfully',
          content: {
            'application/json': {
              schema: listObjectsDto,
            },
          },
        },
        404: {
          description: 'The bucket was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.literal('Bucket not found'),
              }),
            },
          },
        },
      },
    })

    this.bucketRepository.addOpenAPIRoute({
      summary: 'Download object',
      method: 'get',
      path: '/' + join('buckets', bucket.schema.name, '{key}'),
      description: `Download an object from the bucket "${bucket.schema.name}"`,
      tags: [`Bucket "${bucket.schema.name}"`],
      responses: {
        200: {
          description: 'The object was retrieved successfully',
        },
        404: {
          description: 'The bucket or object was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Bucket not found', 'Object not found']),
              }),
            },
          },
        },
      },
    })

    this.bucketRepository.addOpenAPIRoute({
      summary: 'Delete object',
      method: 'delete',
      path: '/' + join('buckets', bucket.schema.name, '{key}'),
      description: `Delete an object from the bucket "${bucket.schema.name}"`,
      tags: [`Bucket "${bucket.schema.name}"`],
      responses: {
        200: {
          description: 'The object was deleted successfully',
        },
        404: {
          description: 'The bucket or object was not found',
          content: {
            'application/json': {
              schema: z.object({
                error: z.enum(['Bucket not found', 'Object not found']),
              }),
            },
          },
        },
      },
    })
  }
}
