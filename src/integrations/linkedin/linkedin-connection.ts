import ky from 'ky'
import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { LinkedinConnectionSchema } from './linkedin-connection.schema'

type LinkedinToken = {
  access_token: string
  expires_in: number
}

export class LinkedinConnectionIntegration {
  public readonly tokenType = 'refresh-token'
  private readonly authBaseUrl = 'https://www.linkedin.com'
  private readonly baseUrl = 'https://api.linkedin.com'

  constructor(
    private readonly schema: LinkedinConnectionSchema,
    private readonly redirectUri: string
  ) {}

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.schema.clientId,
      redirect_uri: this.redirectUri,
      state: String(this.schema.id),
      scope: [
        'r_liteprofile',
        'r_emailaddress',
        'rw_organization_admin',
        'r_organization_social',
        'w_organization_social',
        'w_member_social',
      ].join(' '),
    })
    return `${this.authBaseUrl}/oauth/v2/authorization?${params.toString()}`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema
    const response = await ky
      .post(`${this.authBaseUrl}/oauth/v2/accessToken`, {
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
      .json<LinkedinToken>()
    return {
      id,
      token_type: 'Bearer',
      access_token: response.access_token,
      expires_in: response.expires_in,
      created_at: new Date(),
    }
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'authorization_code',
      code,
    })
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
  }

  async check(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await ky.get(this.baseUrl + '/v2/me', {
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
    const response = await ky.get(
      this.baseUrl + '/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )
    const data = await response.json<{
      elements?: Array<{ 'handle~'?: { emailAddress?: string } }>
    }>()
    return data.elements?.[0]?.['handle~']?.emailAddress ?? ''
  }
}
