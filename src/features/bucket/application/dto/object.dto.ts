import type { Object } from '../../domain/entity/object.entity'

export type ObjectDto = {
  key: string
  size: number | null
  contentType: string | null
  createdAt: string
  updatedAt: string
}

export function toObjectDto(object: Object): ObjectDto {
  return {
    key: object.key,
    size: object.size,
    contentType: object.contentType,
    createdAt: object.createdAt.toISOString(),
    updatedAt: object.updatedAt.toISOString(),
  }
}
