import type { Token } from '../value-object/token.value-object'

export type ITokenRepository = {
  create: (token: Token) => Promise<void>
  update: (token: Token) => Promise<void>
  get: (id: number) => Promise<Token | undefined>
}
