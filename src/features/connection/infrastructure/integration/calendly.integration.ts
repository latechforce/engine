import ky from 'ky'
import type { Token } from '../../domain/value-object/token.value-object'
import type { CalendlyConnectionSchema } from '../../domain/schema/integration/calendly.schema'

type CalendlyToken = {
  token_type: string
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  created_at: string
}

export class CalendlyConnectionIntegration {
  private readonly baseUrl = 'https://api.calendly.com'
  private readonly authBaseUrl = 'https://auth.calendly.com'

  constructor(
    private readonly schema: CalendlyConnectionSchema,
    private readonly redirectUri: string
  ) {}

  getAuthorizationUrl() {
    return `${this.authBaseUrl}/oauth/authorize?client_id=${this.schema.clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema
    const credentials = `${clientId}:${clientSecret}`
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
      .json<CalendlyToken>()
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
      await ky.get(this.baseUrl + '/users/me', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
      return true
    } catch {
      return false
    }
  }
}
