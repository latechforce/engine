import type { Connection } from '@/connection/domain/entity/connection.entity'
import type { ConnectionStatus } from '@/connection/domain/value-object/connection-status.value-object'
import { toConnectionDto, type ConnectionDto } from './connection.dto'

export type ListConnectionsDto = {
  connections: ConnectionDto[]
}

export type ListConnectionsDtoItem = {
  connection: Connection
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
