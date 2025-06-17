import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'
import { toConnectionDto, type ConnectionDto } from './connection.dto'

export type ListConnectionsDto = {
  connections: ConnectionDto[]
}

export type ListConnectionsDtoItem = {
  connection: ConnectionSchema
  status: ConnectionStatus
  authorizationUrl?: string
}

export function toListConnectionsDto(connections: ListConnectionsDtoItem[]): ListConnectionsDto {
  return {
    connections: connections.map(({ connection, status, authorizationUrl }) =>
      toConnectionDto(connection, status, authorizationUrl)
    ),
  }
}
