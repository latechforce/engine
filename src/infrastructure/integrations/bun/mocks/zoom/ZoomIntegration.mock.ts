import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi' // Assuming this path based on pattern
import type { IntegrationResponse } from '/domain/integrations/base'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import { BaseMockIntegration } from '../base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'

export class ZoomIntegration extends BaseMockIntegration implements IZoomIntegration {
  private _users: SQLiteDatabaseTableDriver
  private _webhooks: SQLiteDatabaseTableDriver

  constructor(public config: ZoomConfig) {
    // Use accessToken if available, otherwise clientId for the mock check
    super(config, config.accessToken ?? config.clientSecret)
    this._users = this._db.table({
      name: 'users',
      fields: [
        { name: 'id', type: 'SingleLineText' },
        { name: 'display_name', type: 'SingleLineText' },
        { name: 'email', type: 'SingleLineText' },
        { name: 'timezone', type: 'SingleLineText' },
        { name: 'user_created_at', type: 'DateTime' },
      ],
    })
    this._users.ensureSync()
    this._webhooks = this._db.table({
      name: 'event_subscriptions',
      fields: [
        { name: 'event_subscription_id', type: 'SingleLineText' },
        { name: 'events', type: 'SingleLineText' },
        { name: 'event_subscription_name', type: 'SingleLineText' },
        { name: 'event_webhook_url', type: 'SingleLineText' },
        { name: 'subscription_scope', type: 'LongText' },
        { name: 'created_source', type: 'SingleLineText' },
        { name: 'subscriber_id', type: 'SingleLineText' },
      ],
    })
    this._webhooks.ensureSync()
  }

  authorizationUrl = (redirectUri: string) => {
    return `${this.config.authBaseUrl}/oauth/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${redirectUri}`
  }

  getAccessTokenFromCode = async (): Promise<IntegrationResponse<OAuthAccessToken>> => {
    return {
      data: {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        scope: 'mock-scope',
        token_type: 'Bearer',
      },
    }
  }

  getAccessTokenFromRefreshToken = async (): Promise<IntegrationResponse<OAuthAccessToken>> => {
    return {
      data: {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        scope: 'mock-scope',
        token_type: 'Bearer',
      },
    }
  }
}
