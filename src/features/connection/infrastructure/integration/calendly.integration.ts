import { OAuthIntegration } from './oauth'
import ky from 'ky'
import type { Connection } from '@/connection/domain/entity/connection.entity'
import type { Token } from '@/connection/domain/value-object/token.value-object'
import { CalendlyActionIntegration } from '@/action/infrastructure/integration/calendly'
import type { ConnectionIntegration } from './base'

export class CalendlyConnectionIntegration
  extends OAuthIntegration
  implements ConnectionIntegration
{
  constructor(connection: Connection) {
    super(connection, 'https://auth.calendly.com')
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id } = this.connection.schema
    const credentials = `${this.clientId}:${this.clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    const response = await ky
      .post(`${this.authBaseUrl}/oauth/token`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(body),
      })
      .json<Omit<Token, 'id'>>()
    return {
      id,
      token_type: response.token_type,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expires_in: response.expires_in,
      scope: response.scope,
      created_at: new Date(response.created_at),
    }
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
    })
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: this.redirectUri,
    })
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await new CalendlyActionIntegration().getCurrentUser(token)
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false
    }
  }
}
