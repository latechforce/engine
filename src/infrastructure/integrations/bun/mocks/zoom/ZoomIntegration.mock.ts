import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi' // Assuming this path based on pattern
import type { IntegrationResponse } from '/domain/integrations/base'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import { BaseMockIntegration } from '../base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type {
  CreateEventSubscriptionParams,
  EventSubscription,
} from '/domain/integrations/Zoom/ZoomTypes'
import { randomUUID } from 'crypto'

export class ZoomIntegration extends BaseMockIntegration implements IZoomIntegration {
  private _users: SQLiteDatabaseTableDriver
  private _webhooks: SQLiteDatabaseTableDriver

  constructor(public config: ZoomConfig) {
    // Use accessToken if available, otherwise clientId for the mock check
    super(config, config.clientSecret)
    this._users = this._db.table({
      name: 'users',
      fields: [
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

  createEventSubscription = async (
    params: CreateEventSubscriptionParams
  ): Promise<IntegrationResponse<EventSubscription>> => {
    const eventSubscriptionId = randomUUID()
    const subscriberId = params.subscriber_id || randomUUID()

    // Need to convert params to match the table schema
    const record = {
      id: eventSubscriptionId,
      fields: {
        event_subscription_id: eventSubscriptionId,
        event_subscription_name: params.event_subscription_name,
        event_webhook_url: params.event_webhook_url,
        events: params.events.join(','),
        subscription_scope: params.subscription_scope,
        created_source: 'default',
        subscriber_id: subscriberId,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    this._webhooks.insert(record)

    return {
      data: {
        event_subscription_id: eventSubscriptionId,
        events: params.events,
        event_subscription_name: params.event_subscription_name,
        event_webhook_url: params.event_webhook_url,
        subscription_scope: params.subscription_scope,
        created_source: 'openapi',
        subscriber_id: subscriberId,
      },
    }
  }

  deleteEventSubscription = async (
    eventSubscriptionId: string
  ): Promise<IntegrationResponse<void>> => {
    // For mock implementation, we'll use a direct approach
    // In a real implementation, we would properly search for the record first
    try {
      // Just log that we would delete the event subscription
      this._webhooks.delete(eventSubscriptionId)
      return { data: undefined }
    } catch (error) {
      console.error('Error deleting event subscription:', error)
      return {
        error: {
          status: 500,
          message: 'Failed to delete event subscription',
        },
      }
    }
  }
}
