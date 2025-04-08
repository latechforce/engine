import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
  DeleteWebhookSubscriptionParams,
  GetWebhookSubscriptionParams,
  GetWebhookSubscriptionResponse,
  ListWebhookSubscriptionsParams,
  ListWebhookSubscriptionsResponse,
  WebhookSubscriptionItem,
} from '/domain/integrations/Calendly/CalendlyTypes'
import { Database } from 'bun:sqlite'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'

export class CalendlyIntegration implements ICalendlyIntegration {
  private db: Database
  private userId: string = 'https://api.calendly.com/users/123'

  constructor(_config?: CalendlyConfig) {
    this.db = new Database(_config?.user?.accessToken || ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        uri TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        scheduling_url TEXT,
        timezone TEXT,
        avatar_url TEXT,
        created_at TEXT,
        updated_at TEXT,
        current_organization TEXT,
        slug TEXT
      )
    `)

    // Table pour stocker les webhooks
    this.db.run(`
      CREATE TABLE IF NOT EXISTS WebhookSubscriptions (
        uri TEXT PRIMARY KEY,
        callback_url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        retry_started_at TEXT,
        state TEXT NOT NULL,
        events TEXT NOT NULL,
        scope TEXT NOT NULL,
        organization TEXT NOT NULL,
        user TEXT,
        creator TEXT NOT NULL
      )
    `)
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db
      .query<CalendlyConfig, string>('SELECT * FROM users WHERE uri = ?')
      .get(this.userId)
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return undefined
  }

  createUser = async (user: CalendlyUser): Promise<IntegrationResponse<CalendlyUser>> => {
    this.db.run(
      `
      INSERT INTO users (
        uri, name, email, scheduling_url, timezone, avatar_url, 
        created_at, updated_at, current_organization, slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        user.uri,
        user.name,
        user.email,
        user.scheduling_url,
        user.timezone,
        user.avatar_url,
        user.created_at,
        user.updated_at,
        user.current_organization,
        user.slug,
      ]
    )
    return { data: user }
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams
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

    this.db.run(
      `
      INSERT INTO WebhookSubscriptions (
        uri, callback_url, created_at, updated_at, retry_started_at,
        state, events, scope, organization, user, creator
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        subscription.uri,
        subscription.callbackUrl,
        subscription.createdAt,
        subscription.updatedAt,
        subscription.retryStartedAt,
        subscription.state,
        JSON.stringify(subscription.events),
        subscription.scope,
        subscription.organization,
        subscription.user,
        subscription.creator,
      ]
    )

    return { data: subscription }
  }

  listWebhookSubscriptions = async (
    _params: ListWebhookSubscriptionsParams
  ): Promise<IntegrationResponse<ListWebhookSubscriptionsResponse>> => {
    const result = this.db
      .query<WebhookSubscriptionItem, []>('SELECT * FROM WebhookSubscriptions')
      .all()
    return {
      data: {
        collection: result,
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
    params: GetWebhookSubscriptionParams
  ): Promise<IntegrationResponse<GetWebhookSubscriptionResponse>> => {
    const result = this.db
      .query<WebhookSubscriptionItem, string>('SELECT * FROM WebhookSubscriptions WHERE uri = ?')
      .get(params.webhook_uri)

    if (!result) {
      return { error: { status: 404, message: 'Webhook subscription not found' } }
    }

    return {
      data: {
        resource: {
          uri: result.uri,
          callback_url: result.callback_url,
          created_at: result.created_at,
          updated_at: result.updated_at,
          retry_started_at: result.retry_started_at,
          state: result.state,
          events: result.events,
          scope: result.scope,
          organization: result.organization,
          user: result.user || '',
          creator: result.creator,
        },
      },
    }
  }

  deleteWebhookSubscription = async (
    params: DeleteWebhookSubscriptionParams
  ): Promise<IntegrationResponse<void>> => {
    this.db.run(`DELETE FROM WebhookSubscriptions WHERE uri = ?`, [params.webhook_uri])
    return { data: undefined }
  }

  currentUser = async (): Promise<IntegrationResponse<CalendlyUser>> => {
    const user = this.db
      .query<CalendlyUser, string>('SELECT * FROM users WHERE uri = ?')
      .get(this.userId)
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return { data: user }
  }
}
