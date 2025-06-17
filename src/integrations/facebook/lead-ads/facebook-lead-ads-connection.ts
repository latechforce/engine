import ky from 'ky'
import type { FacebookLeadAdsConnectionSchema } from './facebook-lead-ads-connection.schema'
import type { Token } from '../../../features/connection/domain/value-object/token.value-object'

export class FacebookLeadAdsConnectionIntegration {
  private readonly baseUrl = 'https://graph.facebook.com/v21.0'
  private readonly authBaseUrl = 'https://www.facebook.com/v21.0'

  constructor(
    private readonly schema: FacebookLeadAdsConnectionSchema,
    private readonly redirectUri: string
  ) {}

  getAuthorizationUrl() {
    return `${this.authBaseUrl}/dialog/oauth?client_id=${this.schema.clientId}&redirect_uri=${this.redirectUri}&scope=ads_read,ads_management`
  }

  async getAccessToken(body: Record<string, string>) {
    const response = await ky.get(`${this.authBaseUrl}/oauth/access_token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    })
    return await response.json<{ access_token: string; expires_in: number }>()
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    const tokenResponse = await this.getAccessToken({
      code,
      redirect_uri: this.redirectUri,
      client_id: this.schema.clientId,
      client_secret: this.schema.clientSecret,
    })
    const longLivedResponse = await this.getAccessToken({
      grant_type: 'fb_exchange_token',
      client_id: this.schema.clientId,
      client_secret: this.schema.clientSecret,
      fb_exchange_token: tokenResponse.access_token,
    })
    return this.getToken(longLivedResponse)
  }

  async getAccessTokenFromCurrentToken(currentToken: string): Promise<Token> {
    const response = await this.getAccessToken({
      grant_type: 'fb_exchange_token',
      fb_exchange_token: currentToken,
      client_id: this.schema.clientId,
      client_secret: this.schema.clientSecret,
    })
    return this.getToken(response)
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await ky.get(`${this.baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
      return true
    } catch {
      return false
    }
  }

  private getToken({
    access_token,
    expires_in,
  }: {
    access_token: string
    expires_in: number
  }): Token {
    return {
      id: this.schema.id,
      token_type: 'Bearer',
      access_token,
      expires_in,
      scope: 'ads_read,ads_management',
      created_at: new Date(),
    }
  }
}
