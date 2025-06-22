import { google } from 'googleapis'
import crypto from 'crypto'
import { CodeChallengeMethod, type Credentials, type OAuth2Client } from 'google-auth-library'

import type { Token } from '../../features/connection/domain/value-object/token.value-object'
import type { GoogleConnectionSchema } from './google-connection.schema'

export class GoogleConnectionIntegration {
  public readonly tokenType = 'refresh-token'
  private readonly oauth2Client: OAuth2Client
  private readonly codeVerifier: string

  constructor(
    private readonly connection: GoogleConnectionSchema,
    redirectUri: string,
    private readonly scope: string[]
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      connection.clientId,
      connection.clientSecret,
      redirectUri
    )
    this.codeVerifier = this.generateCodeVerifier()
  }

  getAuthorizationUrl(id: number) {
    const codeChallenge = this.generateCodeChallenge(this.codeVerifier)
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        ...this.scope,
      ],
      state: JSON.stringify({ id }),
      code_challenge_method: CodeChallengeMethod.S256,
      code_challenge: codeChallenge,
    })
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    const { tokens } = await this.oauth2Client.getToken({
      code,
      codeVerifier: this.codeVerifier,
    })
    const token = this.getTokenFromGoogle(tokens)
    return token
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<Token> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    })
    const { credentials } = await this.oauth2Client.refreshAccessToken()
    const token = this.getTokenFromGoogle(credentials)
    return token
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) return false
    try {
      const expiry_date = token.created_at.getTime() + (token.expires_in || 0) * 1000
      this.oauth2Client.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expiry_date,
        token_type: token.token_type,
      })
      const oauth2 = google.oauth2({
        auth: this.oauth2Client,
        version: 'v2',
      })
      await oauth2.userinfo.get()
      return true
    } catch {
      return false
    }
  }

  onNewRefreshToken(callback: (token: Token) => void) {
    this.oauth2Client.on('tokens', (tokens) => {
      callback(this.getTokenFromGoogle(tokens))
    })
  }

  private getTokenFromGoogle(tokens: Credentials): Token {
    if (!tokens.token_type) {
      throw new Error('token_type is required')
    }
    if (!tokens.access_token) {
      throw new Error('access_token is required')
    }
    const token: Token = {
      id: this.connection.id,
      created_at: new Date(),
      token_type: tokens.token_type,
      access_token: tokens.access_token,
    }
    if (tokens.refresh_token) {
      token.refresh_token = tokens.refresh_token
    }
    if (tokens.scope) {
      token.scope = tokens.scope
    }
    if (tokens.expiry_date) {
      token.expires_in = Math.floor((tokens.expiry_date - Date.now()) / 1000)
    }
    return token
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
