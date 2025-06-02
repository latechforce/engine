// Third-party imports
import ky from 'ky'

// Connection domain imports
import type { Token } from '@/connection/domain/value-object/token.value-object'

// Connection infrastructure imports
import { OAuthIntegration } from './oauth'
import type { ConnectionIntegration } from './base'

// Action infrastructure imports
import { CalendlyActionIntegration } from '@/action/infrastructure/integration/calendly'
import type { CalendlyConnectionSchema } from '@/connection/domain/schema/integration/calendly.schema'

export class CalendlyConnectionIntegration
  extends OAuthIntegration
  implements ConnectionIntegration
{
  constructor(
    private readonly connection: CalendlyConnectionSchema,
    appBaseUrl: string
  ) {
    super(connection.id, connection.clientId, appBaseUrl, 'https://auth.calendly.com')
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientSecret } = this.connection
    const credentials = `${this.clientId}:${clientSecret}`
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
