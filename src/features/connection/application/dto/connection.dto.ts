import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'

export type ConnectionDto = {
  id: number
  name: string
  service: string
  connected: boolean
  email_used?: string
  authorizationUrl?: string
  updatedAt: string
}

export function toConnectionDto(
  connection: ConnectionSchema,
  status: ConnectionStatus,
  authorizationUrl?: string
): ConnectionDto {
  return {
    id: connection.id,
    name: connection.name,
    service: connection.service,
    authorizationUrl,
    connected: status.connected,
    updatedAt: status.updatedAt.toISOString(),
    email_used: status.email_used,
  }
}
