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
      'LinkedIn-Version': '202508',
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    }
  }

  async listLeadNotificationSubscriptions(params: {
    organizationId: string
  }): Promise<ListLeadNotificationSubscriptionsResponse> {
    const urn = `urn:li:organization:${params.organizationId}`
    const encodedUrn = encodeURIComponent(urn)
    const query = `q=criteria&owner=(value:(organization:${encodedUrn}))&leadType=(leadType:SPONSORED)`
    return await ky
      .get(this.baseUrl + '/rest/leadNotifications?' + query, {
        headers: this.getHeaders(),
      })
      .json<ListLeadNotificationSubscriptionsResponse>()
  }

  async createLeadNotificationSubscription(params: {
    webhook: string
    organizationId: string
    leadType?: 'SPONSORED'
  }): Promise<GetLeadNotificationSubscriptionResponse> {
    const body = {
      webhook: params.webhook,
      owner: {
        organization: `urn:li:organization:${params.organizationId}`,
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
      organizationId: params.organizationId,
    })
    const response = list.results.find((r) => r.webhook === params.webhook)
    if (!response) {
      throw new Error('Failed to create lead notification subscription')
    }
    return response
  }
}
