import type { App } from '../../domain/entity/app.entity'

export type AppMetadataDto = {
  app: {
    name: string
    version: string
    description: string
  }
}

export function toAppMetadataDto(app: App): AppMetadataDto {
  return {
    app: {
      name: app.schema.name,
      version: app.schema.version,
      description: app.schema.description,
    },
  }
}
