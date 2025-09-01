import ky from 'ky'
import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import type { QontoConnectionSchema } from './qonto-connection.schema'
import type { QontoTokenResponse } from './qonto.types'

export class QontoConnectionIntegration {
  public readonly tokenType = 'bearer'
  private readonly authBaseUrl = 'https://api.qonto.com'

  constructor(
    private readonly schema: QontoConnectionSchema,
    private readonly redirectUri: string,
    private readonly state: string
  ) {}

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.schema.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      state: this.state,
      scope: 'organizations:read invoices:write invoices:read clients:write clients:read',
    })
    return `${this.authBaseUrl}/oauth/authorize?${params.toString()}`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema

    const response = await ky
      .post(`${this.authBaseUrl}/oauth/token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: body.grant_type || 'authorization_code',
          code: body.code || '',
          redirect_uri: body.redirect_uri || '',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      })
      .json<QontoTokenResponse>()

    return {
      id,
      token_type: response.token_type,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expires_in: response.expires_in,
      scope: response.scope,
      created_at: new Date(),
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
    const { id, clientId, clientSecret } = this.schema

    const response = await ky
      .post(`${this.authBaseUrl}/oauth/token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: clientId,
          client_secret: clientSecret,
        }),
      })
      .json<QontoTokenResponse>()

    return {
      id,
      token_type: response.token_type,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expires_in: response.expires_in,
      scope: response.scope,
      created_at: new Date(),
    }
  }

  async check(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      await ky.get(`${this.authBaseUrl}/v2/organizations`, {
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      })
      return true
    } catch {
      return false
    }
  }

  async getEmail(token: Token): Promise<string> {
    try {
      const response = await ky
        .get(`${this.authBaseUrl}/v2/organizations`, {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        })
        .json<{ organizations: Array<{ email?: string; name?: string }> }>()

      return response.organizations?.[0]?.email || ''
    } catch {
      return ''
    }
  }
}
