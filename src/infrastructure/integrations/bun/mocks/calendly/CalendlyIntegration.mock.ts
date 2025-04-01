import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type {
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
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
}
