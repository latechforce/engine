import ky from 'ky'
import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { AirtableConnectionSchema } from './airtable-connection.schema'
import crypto from 'crypto'

type AirtableToken = {
  token_type: string
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  created_at: string
  refresh_expires_in: number
}

export class AirtableConnectionIntegration {
  public readonly tokenType = 'refresh-token'
  private readonly authBaseUrl = 'https://airtable.com'
  private readonly baseUrl = 'https://api.airtable.com'
  private readonly scope = [
    'data.records:read',
    'data.records:write',
    'webhook:manage',
    'user.email:read',
  ]
  private readonly codeVerifier: string

  constructor(
    private readonly schema: AirtableConnectionSchema,
    private readonly redirectUri: string,
    private readonly state: string
  ) {
    this.codeVerifier = this.generateCodeVerifier()
  }

  getAuthorizationUrl() {
    const codeChallenge = this.generateCodeChallenge(this.codeVerifier)
    return `${this.authBaseUrl}/oauth2/v1/authorize?client_id=${this.schema.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scope.join(' ')}&state=${this.state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
  }

  async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.schema
    const credentials = `${clientId}:${clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    const response = await ky
      .post(`${this.authBaseUrl}/oauth2/v1/token`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(body),
      })
      .json<AirtableToken>()
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
      code_verifier: this.codeVerifier,
      client_id: this.schema.clientId,
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
      await ky.get(this.baseUrl + '/v0/meta/whoami', {
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
    const response = await ky.get(this.baseUrl + '/v0/meta/whoami', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
    const data = await response.json<{ email?: string; user?: { email?: string } }>()
    return data.email ?? data.user?.email ?? ''
  }

  private generateCodeVerifier() {
    return crypto.randomBytes(32).toString('hex')
  }

  private generateCodeChallenge(codeVerifier: string) {
    return crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest()
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }
}
