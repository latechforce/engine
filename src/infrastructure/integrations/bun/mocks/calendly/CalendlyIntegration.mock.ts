import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type {
  CalendlyUser,
  CalendlyScope,
  CalendlyWebhookState,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  DeleteWebhookSubscriptionParams,
  GetWebhookSubscriptionParams,
  GetWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
} from '/domain/integrations/Calendly/CalendlyTypes'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { OAuthAccessToken } from '/domain/integrations/OAuth'

type UserRecordFields = RecordFields & {
  uri: string
  name: string
  email: string
  scheduling_url: string
  timezone: string
  avatar_url: string
  current_organization: string
  slug: string
}

type WebhookSubscriptionRecordFields = RecordFields & {
  uri: string
  callback_url: string
  retry_started_at: string | null
  state: string
  events: string
  scope: string
  organization: string
  user: string | null
  creator: string
}

export class CalendlyIntegration extends BaseMockIntegration implements ICalendlyIntegration {
  private _users: SQLiteDatabaseTableDriver
  private _webhooks: SQLiteDatabaseTableDriver

  constructor(public config: CalendlyConfig) {
    super(config, config.accessToken ?? config.clientSecret)
    this._users = this._db.table({
      name: 'users',
      fields: [
        { name: 'uri', type: 'SingleLineText' },
        { name: 'name', type: 'SingleLineText' },
        { name: 'email', type: 'SingleLineText' },
        { name: 'scheduling_url', type: 'SingleLineText' },
        { name: 'timezone', type: 'SingleLineText' },
        { name: 'avatar_url', type: 'SingleLineText' },
        { name: 'current_organization', type: 'SingleLineText' },
        { name: 'slug', type: 'SingleLineText' },
      ],
    })
    this._users.ensureSync()
    this._webhooks = this._db.table({
      name: 'WebhookSubscriptions',
      fields: [
        { name: 'uri', type: 'SingleLineText' },
        { name: 'callback_url', type: 'SingleLineText' },
        { name: 'retry_started_at', type: 'DateTime' },
        { name: 'state', type: 'SingleLineText' },
        { name: 'events', type: 'LongText' },
        { name: 'scope', type: 'SingleLineText' },
        { name: 'organization', type: 'SingleLineText' },
        { name: 'user', type: 'SingleLineText' },
        { name: 'creator', type: 'SingleLineText' },
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

  createUser = async (user: CalendlyUser): Promise<IntegrationResponse<CalendlyUser>> => {
    await this._users.insert({
      id: user.uri,
      created_at: new Date().toISOString(),
      fields: {
        uri: user.uri,
        name: user.name,
        email: user.email,
        scheduling_url: user.scheduling_url,
        timezone: user.timezone,
        avatar_url: user.avatar_url,
        current_organization: user.current_organization,
        slug: user.slug,
      },
    })
    return { data: user }
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams,
    _accessToken?: string
  ): Promise<IntegrationResponse<CreateWebhookSubscriptionResponse>> => {
    const uri = `https://api.calendly.com/webhook_subscriptions/${Math.random().toString(36).substring(7)}`
    const now = new Date().toISOString()

    const subscription: CreateWebhookSubscriptionResponse = {
      uri,
      callbackUrl: params.url,
      createdAt: now,
      updatedAt: now,
      retryStartedAt: null,
      state: 'active',
      events: params.events,
      scope: params.scope || 'organization',
      organization: params.organization || 'default',
      user: params.user || null,
      creator: 'mock-user',
    }

    await this._webhooks.insert({
      id: uri,
      created_at: now,
      fields: {
        uri,
        callback_url: subscription.callbackUrl,
        retry_started_at: subscription.retryStartedAt,
        state: subscription.state,
        events: JSON.stringify(subscription.events),
        scope: subscription.scope,
        organization: subscription.organization,
        user: subscription.user,
        creator: subscription.creator,
      },
    })

    return { data: subscription }
  }

  listWebhookSubscriptions = async (
    _params: ListWebhookSubscriptionsParams,
    _accessToken?: string
  ): Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>> => {
    const result = await this._webhooks.list<WebhookSubscriptionRecordFields>()
    return {
      data: {
        collection: result.map((row) => ({
          uri: row.fields.uri,
          callback_url: row.fields.callback_url,
          created_at: row.created_at,
          updated_at: row.updated_at ?? row.created_at,
          retry_started_at: row.fields.retry_started_at,
          state: row.fields.state as CalendlyWebhookState,
          events: JSON.parse(row.fields.events),
          scope: row.fields.scope as CalendlyScope,
          organization: row.fields.organization,
          user: row.fields.user,
          creator: row.fields.creator,
        })),
        pagination: {
          count: result.length,
          next_page: '1',
          previous_page: '1',
          next_page_token: '',
          previous_page_token: '',
        },
      },
    }
  }

  getWebhookSubscription = async (
    params: GetWebhookSubscriptionParams,
    _accessToken?: string
  ): Promise<IntegrationResponse<GetWebhookSubscriptionResponse>> => {
    const result = await this._webhooks.readById<WebhookSubscriptionRecordFields>(
      params.webhook_uri
    )

    if (!result) {
      return { error: { status: 404, message: 'Webhook subscription not found' } }
    }

    return {
      data: {
        resource: {
          uri: result.fields.uri,
          callback_url: result.fields.callback_url,
          created_at: result.created_at,
          updated_at: result.updated_at ?? result.created_at,
          retry_started_at: result.fields.retry_started_at,
          state: result.fields.state as CalendlyWebhookState,
          events: JSON.parse(result.fields.events),
          scope: result.fields.scope as CalendlyScope,
          organization: result.fields.organization,
          user: result.fields.user || '',
          creator: result.fields.creator,
        },
      },
    }
  }

  deleteWebhookSubscription = async (
    params: DeleteWebhookSubscriptionParams,
    _accessToken?: string
  ): Promise<IntegrationResponse<void>> => {
    await this._webhooks.delete(params.webhook_uri)
    return { data: undefined }
  }

  currentUser = async (accessToken?: string): Promise<IntegrationResponse<CalendlyUser>> => {
    const user = await this._users.readById<UserRecordFields>(
      accessToken ?? this.config.accessToken ?? this.config.clientSecret
    )
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return {
      data: {
        uri: user.fields.uri,
        name: user.fields.name,
        email: user.fields.email,
        scheduling_url: user.fields.scheduling_url,
        timezone: user.fields.timezone,
        avatar_url: user.fields.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at ?? user.created_at,
        current_organization: user.fields.current_organization,
        slug: user.fields.slug,
        resource_type: 'user',
        locale: 'en',
      },
    }
  }
}
