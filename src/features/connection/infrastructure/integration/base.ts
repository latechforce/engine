import type { Token } from '@/connection/domain/value-object/token.value-object'

export type ConnectionIntegration = {
  getAccessToken(body: Record<string, string>): Promise<Token>
  getAccessTokenFromCode(code: string): Promise<Token>
  getAccessTokenFromRefreshToken(refreshToken: string): Promise<Token>
  checkConnection(token?: Token): Promise<boolean>
}
