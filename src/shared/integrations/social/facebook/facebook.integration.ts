import ky from 'ky'
import type {
  ListPageSubscriptionsResponse,
  SubscribePageToLeadgenResponse,
  ListAppSubscriptionsResponse,
  CreateAppSubscriptionResponse,
  GetLeadgenDataResponse,
  GetAccountsResponse,
  GetLeadgenFormsResponse,
  GetFormLeadsResponse,
} from './facebook.types'

export class FacebookIntegration {
  private readonly graphUrl = 'https://graph.facebook.com/v23.0'

  constructor(
    private readonly accessToken: string,
    private readonly appSecret?: string
  ) {}

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
    if (!this.appSecret) {
      throw new Error('App Secret is required for creating app subscriptions')
    }

    const body = new URLSearchParams()
    body.set('object', params.object ?? 'page')
    body.set('callback_url', params.callback_url)
    body.set('access_token', `${params.appId}|${this.appSecret}`)

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
    if (!this.appSecret) {
      throw new Error('App Secret is required for listing app subscriptions')
    }

    return await ky
      .get(`${this.graphUrl}/${appId}/subscriptions`, {
        searchParams: {
          access_token: `${appId}|${this.appSecret}`,
        },
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

  async getLeadgenData(leadgenId: string): Promise<GetLeadgenDataResponse> {
    return await ky
      .get(`${this.graphUrl}/${encodeURIComponent(leadgenId)}`, {
        headers: this.getHeaders(),
      })
      .json<GetLeadgenDataResponse>()
  }

  async getAccounts(): Promise<GetAccountsResponse> {
    return await ky
      .get(`${this.graphUrl}/me/accounts`, {
        headers: this.getHeaders(),
      })
      .json<GetAccountsResponse>()
  }

  async getLeadgenForms(pageId: string): Promise<GetLeadgenFormsResponse> {
    return await ky
      .get(`${this.graphUrl}/${pageId}/leadgen_forms`, {
        headers: this.getHeaders(),
      })
      .json<GetLeadgenFormsResponse>()
  }

  async getFormLeads(formId: string): Promise<GetFormLeadsResponse> {
    return await ky
      .get(`${this.graphUrl}/${formId}/leads`, {
        headers: this.getHeaders(),
      })
      .json<GetFormLeadsResponse>()
  }

  async subscribePageToWebhook(
    pageId: string,
    pageAccessToken: string
  ): Promise<SubscribePageToLeadgenResponse> {
    return await ky
      .post(`${this.graphUrl}/${pageId}/subscribed_apps`, {
        json: {
          subscribed_fields: ['leadgen'],
          access_token: pageAccessToken,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .json<SubscribePageToLeadgenResponse>()
  }
}
