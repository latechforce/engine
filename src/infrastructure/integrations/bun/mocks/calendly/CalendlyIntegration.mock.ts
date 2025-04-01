import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type { CalendlyError } from '/domain/integrations/Calendly/CalendlyTypes'
import type { GetAuthorizationCodeParams, GetAuthorizationCodeResponse, GetAccessTokenParams, GetAccessTokenResponse } from '/domain/integrations/Calendly/CalendlyTypes'
import { Database } from 'bun:sqlite'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'

export class CalendlyIntegration implements ICalendlyIntegration {
  private db: Database

  constructor(private _config?: CalendlyConfig) {
    this.db = new Database(_config?.accessToken ?? ':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY)`)
    
    // Table pour stocker les tokens
    this.db.run(`
      CREATE TABLE IF NOT EXISTS CalendlyTokens (
        id TEXT PRIMARY KEY,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        token_type TEXT NOT NULL,
        scope TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        expires_in INTEGER NOT NULL,
        owner TEXT NOT NULL,
        organization TEXT NOT NULL
      )
    `)
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db
      .query<CalendlyConfig, string>('SELECT * FROM users WHERE id = ?')
      .get(this._config?.accessToken ?? '')
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return undefined
  }

  getAuthorizationCode = async (params: GetAuthorizationCodeParams): Promise<{ data?: GetAuthorizationCodeResponse; error?: CalendlyError }> => {
    // En mode mock, on simule une URL de redirection avec un code
    return { data: { code: `https://example.com/callback?code=mock_auth_code` } }
  }

  getAccessToken = async (params: GetAccessTokenParams): Promise<{ data?: GetAccessTokenResponse; error?: CalendlyError }> => {
    const mockToken: GetAccessTokenResponse = {
      tokenType: 'Bearer',
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      scope: 'default',
      createdAt: Date.now(),
      expiresIn: 7200,
      owner: 'https://api.calendly.com/users/mock_user',
      organization: 'https://api.calendly.com/organizations/mock_org'
    }

    // Stocker le token dans la base de données
    this.db.run(`
      INSERT OR REPLACE INTO CalendlyTokens (
        id, access_token, refresh_token, token_type, scope, created_at, expires_in, owner, organization
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'mock_token_id',
      mockToken.accessToken,
      mockToken.refreshToken,
      mockToken.tokenType,
      mockToken.scope,
      mockToken.createdAt,
      mockToken.expiresIn,
      mockToken.owner,
      mockToken.organization
    ])

    return { data: mockToken }
  }
}
