import ky from 'ky'
import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { FacebookConnectionSchema } from './facebook-connection.schema'

type FacebookToken = {
  access_token: string
  token_type?: string
  expires_in?: number
}
export class FacebookConnectionIntegration {
  public readonly tokenType = 'short-lived-token'
  private readonly authBaseUrl = 'https://www.facebook.com'
  private readonly graphUrl = 'https://graph.facebook.com/v23.0'

  constructor(
    private readonly schema: FacebookConnectionSchema,
    private readonly redirectUri: string,
    private readonly scope: string[]
  ) {}

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.schema.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      state: String(this.schema.id),
      scope: ['email', ...this.scope].join(','),
    })
    return `${this.authBaseUrl}/dialog/oauth?${params.toString()}`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema
    const response = await ky
      .post(`${this.graphUrl}/oauth/access_token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: this.redirectUri,
          ...body,
        }),
      })
      .json<FacebookToken>()
    return {
      id,
      token_type: response.token_type ?? 'Bearer',
      access_token: response.access_token,
      expires_in: response.expires_in ?? null,
      created_at: new Date(),
    }
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'authorization_code',
      code,
    })
  }

  async getAccessTokenFromShortLivedToken(shortLivedToken: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'fb_exchange_token',
      fb_exchange_token: shortLivedToken,
    })
  }

  async check(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await ky.get(this.graphUrl + '/me', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
      return true
    } catch {
      return false
    }
  }

  async getEmail(token: Token): Promise<string> {
    const response = await ky.get(this.graphUrl + '/me?fields=email', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
    const data = await response.json<{ email?: string }>()
    return data.email ?? ''
  }
}
