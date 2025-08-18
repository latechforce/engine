import ky from 'ky'
import type {
  GetLeadNotificationSubscriptionResponse,
  ListLeadNotificationSubscriptionsResponse,
} from './linkedin.types'

export class LinkedinIntegration {
  private readonly baseUrl = 'https://api.linkedin.com'

  constructor(private readonly accessToken: string) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'LinkedIn-Version': '202405',
      'Content-Type': 'application/json',
    }
  }

  async listLeadNotificationSubscriptions(params: {
    organizationUrn: string
  }): Promise<ListLeadNotificationSubscriptionsResponse> {
    const query = new URLSearchParams({
      q: 'owners',
      owners: params.organizationUrn,
    })
    return await ky
      .get(this.baseUrl + '/rest/leadNotifications?' + query.toString(), {
        headers: this.getHeaders(),
      })
      .json<ListLeadNotificationSubscriptionsResponse>()
  }

  async createLeadNotificationSubscription(params: {
    webhook: string
    organizationUrn: string
    leadType?: 'SPONSORED'
  }): Promise<GetLeadNotificationSubscriptionResponse> {
    const body = {
      webhook: params.webhook,
      owner: {
        organization: params.organizationUrn,
      },
      leadType: params.leadType ?? 'SPONSORED',
    }
    await ky
      .post(this.baseUrl + '/rest/leadNotifications', {
        headers: this.getHeaders(),
        json: body,
      })
      .json<GetLeadNotificationSubscriptionResponse>()
    const list = await this.listLeadNotificationSubscriptions({
      organizationUrn: params.organizationUrn,
    })
    const response = list.results.find((r) => r.webhook === params.webhook)
    if (!response) {
      throw new Error('Failed to create lead notification subscription')
    }
    return response
  }
}
