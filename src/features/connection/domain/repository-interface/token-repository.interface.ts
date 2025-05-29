import type { Connection } from '../entity/connection.entity'
import type { Token } from '../value-object/token.value-object'

export type ITokenRepository = {
  create: (token: Token) => Promise<void>
  update: (token: Token) => Promise<void>
  get: (id: number) => Promise<Token | undefined>
  getAccessToken: (connection: Connection) => Promise<Token | undefined>
}
