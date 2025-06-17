import ky from 'ky'
import type { LinkedInAdsConnectionSchema } from './linkedin-ads-connection.schema'
import type { Token } from '../../../features/connection/domain/value-object/token.value-object'

export class LinkedInAdsConnectionIntegration {
  private readonly authBaseUrl = 'https://www.linkedin.com/oauth/v2'

  constructor(
    private readonly schema: LinkedInAdsConnectionSchema,
    private readonly redirectUri: string
  ) {}

  getAuthorizationUrl() {
    return `${this.authBaseUrl}/authorization?client_id=${this.schema.clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    const response = await ky.post(`${this.authBaseUrl}/accessToken`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.schema.clientId,
        client_secret: this.schema.clientSecret,
      }),
    })
    const data = await response.json<{ access_token: string; expires_in: number }>()
    return {
      id: this.schema.id,
      token_type: 'Bearer',
      access_token: data.access_token,
      expires_in: data.expires_in,
      created_at: new Date(),
    }
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await ky.get(`${this.authBaseUrl}/me`, {
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
