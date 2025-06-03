import ky from 'ky'
import type {
  CreateWebhookSubscriptionResponse,
  GetCurrentUserResponse,
  ListWebhookSubscriptionsResponse,
} from './types'

export class CalendlyIntegration {
  private readonly baseUrl = 'https://api.calendly.com'

  constructor(private readonly accessToken: string) {}

  private getTokenHeader() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  async listWebhookSubscriptions({
    organization,
    scope,
    count,
    user,
  }: {
    organization: string
    scope: string
    count?: number
    user?: string
  }): Promise<ListWebhookSubscriptionsResponse> {
    const query = new URLSearchParams({ organization, scope })
    if (count) query.set('count', count.toString())
    if (user) query.set('user', user)
    const response = await ky.get(this.baseUrl + '/webhook_subscriptions?' + query.toString(), {
      headers: this.getTokenHeader(),
    })
    return response.json<ListWebhookSubscriptionsResponse>()
  }

  async createWebhookSubscription(body: {
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
  }): Promise<CreateWebhookSubscriptionResponse> {
    return await ky
      .post(this.baseUrl + '/webhook_subscriptions', {
        json: body,
        headers: this.getTokenHeader(),
      })
      .json<CreateWebhookSubscriptionResponse>()
  }

  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    return await ky
      .get(this.baseUrl + '/users/me', {
        headers: this.getTokenHeader(),
      })
      .json<GetCurrentUserResponse>()
  }
}
