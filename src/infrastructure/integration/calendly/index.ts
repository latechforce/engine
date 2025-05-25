import { OAuthIntegration } from '../oauth'
import ky from 'ky'
import type { Connection } from '@/domain/entity/connection.entity'
import type { Token } from '@/domain/value-object/token.value-object'
import type { IntegrationTrigger } from '@/domain/entity/trigger/integration-trigger.entity'
import type { IntegrationAction } from '@/domain/entity/action/integration-action.entity'
import type { CreateWebhookSubscriptionResponse, ListWebhookSubscriptionsResponse } from './types'

export class CalendlyIntegration extends OAuthIntegration {
  constructor(connection: Connection) {
    super(connection, 'https://api.calendly.com', 'https://auth.calendly.com')
  }

  private async getAccessToken(body: Record<string, string>): Promise<Token> {
    const { id, clientId, clientSecret } = this.connection.schema
    const credentials = `${clientId}:${clientSecret}`
    const base64Credentials = Buffer.from(credentials).toString('base64')
    const response = await ky
      .post(`${this.authBaseUrl}/oauth/token`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(body),
      })
      .json<Omit<Token, 'id'>>()
    return {
      id,
      token_type: response.token_type,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expires_in: response.expires_in,
      scope: response.scope,
      created_at: new Date(response.created_at),
    }
  }

  async getAccessTokenFromCode(code: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
    })
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<Token> {
    return this.getAccessToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: this.redirectUri,
    })
  }

  async checkConnection(token?: Token): Promise<boolean> {
    if (!token) {
      return false
    }
    const { access_token } = token
    const response = await ky.get(this.baseUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.ok
  }

  async setupTrigger(trigger: IntegrationTrigger, token: Token) {
    const { schema } = trigger
    switch (schema.event) {
      case 'invite-created': {
        const webhookSubscriptions = await this.listWebhookSubscriptions(token, {
          organization: schema.organization,
          scope: schema.scope,
        })
        const webhookSubscription = webhookSubscriptions.collection.find((subscription) =>
          subscription.callback_url.includes(schema.path)
        )
        if (!webhookSubscription) {
          await this.createWebhookSubscription(token, {
            url: trigger.url,
            events: ['invitee.created'],
            organization: schema.organization,
            scope: schema.scope,
          })
        }
        break
      }
      default:
        throw new Error(`Unsupported trigger type: ${schema.event}`)
    }
  }

  async runAction(action: IntegrationAction, token: Token): Promise<object> {
    const { schema } = action
    switch (schema.action) {
      case 'list-webhook-subscriptions': {
        return this.listWebhookSubscriptions(token, {
          organization: schema.organization,
          scope: schema.scope,
          count: schema.count,
        })
      }
    }
  }

  private async listWebhookSubscriptions(
    token: Token,
    { organization, scope, count }: { organization: string; scope: string; count?: number }
  ): Promise<ListWebhookSubscriptionsResponse> {
    const query = new URLSearchParams({ organization, scope })
    if (count) query.set('count', count.toString())
    const response = await ky.get(this.baseUrl + '/webhook_subscriptions?' + query.toString(), {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
    return response.json<ListWebhookSubscriptionsResponse>()
  }

  private async createWebhookSubscription(
    token: Token,
    body: {
      url: string
      organization: string
      scope: string
      events: [
        | 'invitee.created'
        | 'invitee.canceled'
        | 'invitee_no_show.created'
        | 'invitee_no_show.deleted'
        | 'routing_form_submission.created',
      ]
    }
  ): Promise<CreateWebhookSubscriptionResponse> {
    const response = await ky.post(this.baseUrl + '/webhook_subscriptions', {
      json: body,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
    return response.json<CreateWebhookSubscriptionResponse>()
  }
}
