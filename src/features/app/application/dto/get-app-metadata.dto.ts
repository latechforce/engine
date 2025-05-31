import type { App } from '../../domain/entity/app.entity'

export type GetAppMetadataDto = {
  app: {
    name: string
    version: string
    description: string
  }
}

export function toGetAppMetadataDto(app: App): GetAppMetadataDto {
  return {
    app: {
      name: app.schema.name,
      version: app.schema.version,
      description: app.schema.description,
    },
  }
}
