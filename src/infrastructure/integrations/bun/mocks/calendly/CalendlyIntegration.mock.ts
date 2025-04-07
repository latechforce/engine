import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type {
  CalendlyUser,
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
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

  constructor(private _config?: CalendlyConfig) {
    this.db = new Database(':memory:')
    this.db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY)`)
    const userId = this._config?.user.accessToken ?? ''

    // TODO: remove this line to be configured in the test, not in the code
    this.db.run(`INSERT INTO users (id) VALUES (?)`, [userId])

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

    // TODO: remove this line to be configured in the test, not in the code
    this.db.run(
      `
        INSERT INTO WebhookSubscriptions (
          uri, callback_url, created_at, updated_at, retry_started_at,
        state, events, scope, organization, user, creator
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        // Webhook 1
        'https://api.calendly.com/webhook_subscriptions/123',
        'https://example.com/webhook1',
        '2023-01-01T00:00:00Z',
        '2023-01-01T00:00:00Z',
        null,
        'active',
        JSON.stringify(['invitee.created', 'invitee.canceled']),
        'organization',
        'https://api.calendly.com/organizations/ABCDEF',
        null,
        'https://api.calendly.com/users/123',

        // Webhook 2
        'https://api.calendly.com/webhook_subscriptions/456',
        'https://example.com/webhook2',
        '2023-02-01T00:00:00Z',
        '2023-02-01T00:00:00Z',
        null,
        'active',
        JSON.stringify(['invitee.created']),
        'user',
        'https://api.calendly.com/organizations/ABCDEF',
        'https://api.calendly.com/users/456',
        'https://api.calendly.com/users/456',

        // Webhook 3
        'https://api.calendly.com/webhook_subscriptions/789',
        'https://example.com/webhook3',
        '2023-03-01T00:00:00Z',
        '2023-03-01T00:00:00Z',
        '2023-03-02T00:00:00Z',
        'disabled',
        JSON.stringify(['invitee.canceled']),
        'organization',
        'https://api.calendly.com/organizations/ABCDEF',
        null,
        'https://api.calendly.com/users/789',

        // Webhook 4
        'https://api.calendly.com/webhook_subscriptions/abc',
        'https://example.com/webhook4',
        '2023-04-01T00:00:00Z',
        '2023-04-01T00:00:00Z',
        null,
        'active',
        JSON.stringify(['invitee_no_show.created']),
        'user',
        'https://api.calendly.com/organizations/ABCDEF',
        'https://api.calendly.com/users/abc',
        'https://api.calendly.com/users/abc',

        // Webhook 5
        'https://api.calendly.com/webhook_subscriptions/def',
        'https://example.com/webhook5',
        '2023-05-01T00:00:00Z',
        '2023-05-01T00:00:00Z',
        null,
        'active',
        JSON.stringify(['routing_form_submission.created']),
        'organization',
        'https://api.calendly.com/organizations/ABCDEF',
        null,
        'https://api.calendly.com/users/def',
      ]
    )
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    const user = this.db
      .query<CalendlyConfig, string>('SELECT * FROM users WHERE id = ?')
      .get(this._config?.user.accessToken ?? '')
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return undefined
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
      .query<WebhookSubscriptionItem, string>('SELECT * FROM WebhookSubscriptions WHERE uri LIKE ?')
      .get(`%${params.webhook_uuid}%`)

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

  currentUser = async (): Promise<IntegrationResponse<CalendlyUser>> => {
    const user = this.db
      .query<CalendlyUser, string>('SELECT * FROM users WHERE id = ?')
      .get(this._config?.user.accessToken ?? '')
    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }
    return { data: user }
  }
}
