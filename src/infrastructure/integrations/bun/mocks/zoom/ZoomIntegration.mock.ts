import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi' // Assuming this path based on pattern
import type { IntegrationResponse } from '/domain/integrations/base'
import type { ZoomConfig } from '/domain/integrations/Zoom/ZoomConfig'
import { BaseMockIntegration } from '../base'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type {
  CreateEventSubscriptionParams,
  EventSubscription,
  GetUserEventSubscriptionsParams,
  GetUserEventSubscriptionsResponse,
  RegisterWebhookParams,
} from '/domain/integrations/Zoom/ZoomTypes'
import { randomUUID } from 'crypto'

// Assumed structure of webhook records based on the code
interface WebhookRecord {
  id: string
  fields: {
    event_subscription_id: string
    events: string
    event_subscription_name: string
    event_webhook_url: string
    subscription_scope: string
    created_source: string
    subscriber_id: string
  }
}

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
  async registerWebhook(params: RegisterWebhookParams): Promise<IntegrationResponse<void>> {
    const eventSubscriptions = await this.getUserEventSubscriptions({
      user_id: params.user_id,
      account_id: params.account_id,
    })

    if (
      eventSubscriptions.data?.event_subscriptions.find((e) => e.event_webhook_url === params.url)
    ) {
      return { data: undefined }
    }

    await this.createEventSubscription({
      event_subscription_name: params.event,
      event_webhook_url: params.url,
      events: [params.event],
      subscription_scope: 'account',
      account_id: params.account_id,
      user_ids: [params.user_id],
    })

    return { data: undefined }
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
    const subscriberId = params.user_ids?.[0] || randomUUID()

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

  getUserEventSubscriptions = async (
    params: GetUserEventSubscriptionsParams
  ): Promise<IntegrationResponse<GetUserEventSubscriptionsResponse>> => {
    // Get subscriptions from the database
    const pageSize = params.page_size || 30

    // Filter based on subscription_scope if provided
    // In a real implementation we would construct a proper FilterDto object
    // Here we'll just use listSync which returns all records
    const records = this._webhooks.listSync() as unknown as WebhookRecord[]

    // Filter records by subscription_scope if needed
    const filteredRecords = params.subscription_scope
      ? records.filter((record) => record.fields.subscription_scope === params.subscription_scope)
      : records

    // Limit to page size
    const limitedRecords = filteredRecords.slice(0, pageSize)

    // Transform the records to EventSubscription objects
    const eventSubscriptions = limitedRecords.map((record: WebhookRecord) => ({
      event_subscription_id: record.fields.event_subscription_id,
      events: record.fields.events.split(','),
      event_subscription_name: record.fields.event_subscription_name,
      event_webhook_url: record.fields.event_webhook_url,
      subscription_scope: record.fields.subscription_scope as 'user' | 'account' | 'master_account',
      created_source: record.fields.created_source,
      subscriber_id: record.fields.subscriber_id,
    }))

    return {
      data: {
        page_size: pageSize,
        next_page_token: limitedRecords.length === pageSize ? randomUUID() : undefined,
        event_subscriptions: eventSubscriptions,
      },
    }
  }
}
