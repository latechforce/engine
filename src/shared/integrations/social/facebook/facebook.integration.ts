import ky from 'ky'
import type {
  ListPageSubscriptionsResponse,
  SubscribePageToLeadgenResponse,
  ListAppSubscriptionsResponse,
  CreateAppSubscriptionResponse,
} from './facebook.types'

export class FacebookIntegration {
  private readonly graphUrl = 'https://graph.facebook.com/v23.0'

  constructor(private readonly accessToken: string) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    }
  }

  async listPageSubscriptions(pageId: string): Promise<ListPageSubscriptionsResponse> {
    return await ky
      .get(`${this.graphUrl}/${pageId}/subscribed_apps`, {
        headers: this.getHeaders(),
      })
      .json<ListPageSubscriptionsResponse>()
  }

  async subscribePageToLeadGen(pageId: string): Promise<SubscribePageToLeadgenResponse> {
    return await ky
      .post(`${this.graphUrl}/${pageId}/subscribed_apps`, {
        json: { subscribed_fields: ['leadgen'] },
        headers: this.getHeaders(),
      })
      .json<SubscribePageToLeadgenResponse>()
  }

  async createAppSubscription(params: {
    appId: string
    callback_url: string
    object?: 'page'
    fields?: string[]
    verify_token?: string
  }): Promise<CreateAppSubscriptionResponse> {
    const body = new URLSearchParams()
    body.set('object', params.object ?? 'page')
    body.set('callback_url', params.callback_url)
    body.set('access_token', this.accessToken)

    if (params.fields && params.fields.length > 0) {
      body.set('fields', params.fields.join(','))
    }
    if (params.verify_token) {
      body.set('verify_token', params.verify_token)
    }

    // Facebook requires access_token in the body for this endpoint
    return await ky
      .post(`${this.graphUrl}/${params.appId}/subscriptions`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })
      .json<CreateAppSubscriptionResponse>()
  }

  async listAppSubscriptions(appId: string): Promise<ListAppSubscriptionsResponse> {
    return await ky
      .get(`${this.graphUrl}/${appId}/subscriptions`, {
        headers: this.getHeaders(),
      })
      .json<ListAppSubscriptionsResponse>()
  }

  async isPageSubscribedToLeadGen(pageId: string): Promise<boolean> {
    try {
      const response = await this.listPageSubscriptions(pageId)
      // Check if any app has leadgen in subscribed_fields
      return response.data.some(
        (subscription) => subscription.subscribed_fields?.includes('leadgen') ?? false
      )
    } catch {
      return false
    }
  }
}
