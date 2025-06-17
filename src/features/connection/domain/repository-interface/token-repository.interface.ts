import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { Token } from '../value-object/token.value-object'

export type ITokenRepository = {
  check: (connection: ConnectionSchema) => Promise<boolean>
  create: (token: Token) => Promise<void>
  update: (token: Token) => Promise<void>
  get: (id: number) => Promise<Token | undefined>
  getAccessToken: (connection: ConnectionSchema) => Promise<Token | undefined>
  onNewRefreshToken: (
    connection: ConnectionSchema,
    callback: (token: Token) => Promise<void>
  ) => void
}
