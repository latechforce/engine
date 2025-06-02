import { google } from 'googleapis'
import type { OAuth2Client } from 'google-auth-library'

import type { Token } from '@/connection/domain/value-object/token.value-object'
import { CalendlyActionIntegration } from '@/action/infrastructure/integration/calendly'
import type { GoogleConnectionSchema } from '@/connection/domain/schema/integration/google-sheets.schema'

export class GoogleSheetsConnectionIntegration {
  private readonly oauth2Client: OAuth2Client

  constructor(
    private readonly connection: GoogleConnectionSchema,
    redirectUri: string
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      connection.clientId,
      connection.clientSecret,
      redirectUri
    )
  }

  getAuthorizationUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    })
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    const { tokens } = await this.oauth2Client.getToken(code)
    if (!tokens.access_token) {
      throw new Error('No access token found')
    }
    if (!tokens.refresh_token) {
      throw new Error('No refresh token found')
    }
    if (!tokens.expiry_date) {
      throw new Error('No expiry date found')
    }
    if (!tokens.scope) {
      throw new Error('No scope found')
    }
    if (!tokens.token_type) {
      throw new Error('No token type found')
    }
    return {
      id: this.connection.id,
      token_type: tokens.token_type,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expiry_date,
      scope: tokens.scope,
      created_at: new Date(),
    }
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
