import type { Connection } from '../entity/connection.entity'
import type { ConnectionStatus } from '../value-object/connection-status.value-object'
import type { Token } from '../value-object/token.value-object'

export type IConnectionRepository = {
  redirectUri: string
  debug: (message: string) => void
  error: (message: string) => void
  getAuthorizationUrl: (connection: Connection) => string
  getAccessTokenFromCode: (connection: Connection, code: string) => Promise<Token>
  status: {
    create: (status: ConnectionStatus) => Promise<void>
    setConnected: (id: number, connected: boolean) => Promise<void>
    get: (id: number) => Promise<ConnectionStatus | undefined>
    listByIds: (ids: number[]) => Promise<ConnectionStatus[]>
  }
  sendDisconnectedEmail: (connection: Connection) => Promise<void>
}
