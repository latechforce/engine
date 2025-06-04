import type { Connection } from '../../domain/entity/connection.entity'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'

export type ConnectionDto = {
  name: string
  service: string
  authType: 'oauth' | 'api-key'
  connected: boolean
  authorizationUrl?: string
}

export function toConnectionDto(
  connection: Connection,
  status: ConnectionStatus,
  authorizationUrl?: string
): ConnectionDto {
  return {
    name: connection.schema.name,
    service: connection.schema.service,
    authType: connection.authType,
    authorizationUrl,
    connected: status.connected,
  }
}
