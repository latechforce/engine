import type { Connection } from '@/domain/entity/connection.entity'
import ky from 'ky'
import type { Token } from '@/domain/value-object/token.value-object'

export class OAuthIntegration {
  constructor(
    protected readonly connection: Connection,
    protected readonly baseUrl: string,
    protected readonly authBaseUrl: string
  ) {}

  get redirectUri() {
    const { id } = this.connection.schema
    return this.connection.appBaseUrl + '/api/connection/auth?id=' + id
  }

  getAuthorizationUrl() {
    const { clientId } = this.connection.schema
    return `${this.authBaseUrl}/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${this.redirectUri}`
  }

  async getAccessToken(code: string): Promise<Token> {
    const { id, clientId, clientSecret } = this.connection.schema
    const credentials = `${clientId}:${clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    const response = await ky
      .post(`${this.authBaseUrl}/oauth/token`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
        }),
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
}
