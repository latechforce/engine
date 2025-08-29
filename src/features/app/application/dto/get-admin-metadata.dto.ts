import type { AutomationStatus } from '../../../../features/automation/domain/value-object/automation-status.value-object'
import type { App } from '../../domain/entity/app.entity'

export type GetAdminMetadataDto = {
  admin: {
    name: string
    version: string
    automations: {
      id: number
      name: string
      active: boolean
    }[]
    connections: {
      id: number
      name: string
    }[]
    forms: {
      id: number
      name: string
      path: string
    }[]
    tables: {
      id: number
      name: string
    }[]
  }
}

export function toGetAdminMetadataDto(app: App, status: AutomationStatus[]): GetAdminMetadataDto {
  return {
    admin: {
      name: app.schema.name,
      version: app.schema.appVersion,
      tables: app.schema.tables.map((table) => ({
        id: table.id,
        name: table.name,
      })),
      automations: app.schema.automations.map((automation) => ({
        id: automation.id,
        name: automation.name,
        active: status.find((s) => s.id === automation.id)?.active ?? false,
      })),
      connections: app.schema.connections.map((connection) => ({
        id: connection.id,
        name: connection.name,
      })),
      forms: app.schema.forms.map((form) => ({
        id: form.id,
        name: form.name,
        path: form.path,
      })),
    },
  }
}
