import type { App } from '@/domain/entity/app.entity'

export type MetadataDto = {
  name: string
  version: string
  description: string
}

export function toMetadataDto(app: App): MetadataDto {
  return {
    name: app.schema.name,
    version: app.schema.version,
    description: app.schema.description,
  }
}
