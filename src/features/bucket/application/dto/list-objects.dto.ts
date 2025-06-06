import type { Object } from '../../domain/entity/object.entity'
import { z } from 'zod'
import { toObjectDto } from './object.dto'

export const listObjectsDto = z.object({
  objects: z.array(
    z.object({
      key: z.string(),
      contentType: z.string().nullable(),
      size: z.number().nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
})

export type ListObjectsDto = z.infer<typeof listObjectsDto>

export function toListObjectsDto(objects: Object[]): ListObjectsDto {
  return {
    objects: objects.map(toObjectDto),
  }
}
