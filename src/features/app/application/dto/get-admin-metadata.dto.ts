import type { App } from '../../domain/entity/app.entity'

export type GetAdminMetadataDto = {
  admin: {
    name: string
    version: string
    automations: {
      id: number
      name: string
    }[]
    connections: {
      id: number
      name: string
    }[]
    forms: {
      id: number
      name: string
    }[]
    tables: {
      id: number
      name: string
    }[]
  }
}

export function toGetAdminMetadataDto(app: App): GetAdminMetadataDto {
  return {
    admin: {
      name: app.schema.name,
      version: app.schema.version,
      tables: app.schema.tables.map((table) => ({
        id: table.id,
        name: table.name,
      })),
      automations: app.schema.automations.map((automation) => ({
        id: automation.id,
        name: automation.name,
      })),
      connections: app.schema.connections.map((connection) => ({
        id: connection.id,
        name: connection.name,
      })),
      forms: app.schema.forms.map((form) => ({
        id: form.id,
        name: form.name,
      })),
    },
  }
}
