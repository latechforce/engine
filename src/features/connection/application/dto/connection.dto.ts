import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'

export type ConnectionDto = {
  name: string
  service: string
  connected: boolean
  authorizationUrl?: string
}

export function toConnectionDto(
  connection: ConnectionSchema,
  status: ConnectionStatus,
  authorizationUrl?: string
): ConnectionDto {
  return {
    name: connection.name,
    service: connection.service,
    authorizationUrl,
    connected: status.connected,
  }
}
