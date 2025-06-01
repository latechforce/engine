import ky from 'ky'
import type { Token } from '@/connection/domain/value-object/token.value-object'
import type { IntegrationAction } from '@/action/domain/entity/integration-action.entity'
import type {
  CreateWebhookSubscriptionResponse,
  GetCurrentUserResponse,
  ListWebhookSubscriptionsResponse,
} from './types'
import { BaseActionIntegration } from '../base'

export class CalendlyActionIntegration extends BaseActionIntegration {
  constructor() {
    super('https://api.calendly.com')
  }

  async runAction(action: IntegrationAction, token: Token): Promise<object> {
    const { schema } = action
    switch (schema.action) {
      case 'list-webhook-subscriptions': {
        const currentUser = await this.getCurrentUser(token)
        const organization = schema.organization ?? currentUser.resource.current_organization
        const scope = schema.scope ?? 'user'
        const count = schema.count ?? 20
        const user = scope === 'user' ? currentUser.resource.uri : undefined
        return this.listWebhookSubscriptions(token, {
          organization,
          scope,
          count,
          user,
        })
      }
      default:
        throw new Error(`Unsupported Calendly action type: ${schema.action}`)
    }
  }

  async listWebhookSubscriptions(
    token: Token,
    {
      organization,
      scope,
      count,
      user,
    }: { organization: string; scope: string; count?: number; user?: string }
  ): Promise<ListWebhookSubscriptionsResponse> {
    const query = new URLSearchParams({ organization, scope })
    if (count) query.set('count', count.toString())
    if (user) query.set('user', user)
    const response = await ky.get(this.baseUrl + '/webhook_subscriptions?' + query.toString(), {
      headers: this.getTokenHeader(token),
    })
    return response.json<ListWebhookSubscriptionsResponse>()
  }

  async createWebhookSubscription(
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
      user?: string
    }
  ): Promise<CreateWebhookSubscriptionResponse> {
    return await ky
      .post(this.baseUrl + '/webhook_subscriptions', {
        json: body,
        headers: this.getTokenHeader(token),
      })
      .json<CreateWebhookSubscriptionResponse>()
  }

  async getCurrentUser(token: Token): Promise<GetCurrentUserResponse> {
    return await ky
      .get(this.baseUrl + '/users/me', {
        headers: this.getTokenHeader(token),
      })
      .json<GetCurrentUserResponse>()
  }
}
