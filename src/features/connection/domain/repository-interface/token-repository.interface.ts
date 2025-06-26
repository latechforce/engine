import type { Connection } from '../entity/connection.entity'
import type { Token } from '../value-object/token.value-object'

export type ITokenRepository = {
  check: (connection: Connection) => Promise<boolean>
  create: (token: Token) => Promise<void>
  update: (token: Token) => Promise<void>
  get: (id: number) => Promise<Token | undefined>
  getAccessToken: (connection: Connection) => Promise<Token | undefined>
  onNewRefreshToken: (connection: Connection, callback: (token: Token) => Promise<void>) => void
}
