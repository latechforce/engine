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
    organizationId?: string
    sponsoredAccountId?: string
  }): Promise<ListLeadNotificationSubscriptionsResponse> {
    let urn: string
    let ownerType: string

    if (params.sponsoredAccountId) {
      urn = `urn:li:sponsoredAccount:${params.sponsoredAccountId}`
      ownerType = 'sponsoredAccount'
    } else if (params.organizationId) {
      urn = `urn:li:organization:${params.organizationId}`
      ownerType = 'organization'
    } else {
      throw new Error('Either organizationId or sponsoredAccountId must be provided')
    }

    const encodedUrn = encodeURIComponent(urn)
    const query = `q=criteria&owner=(value:(${ownerType}:${encodedUrn}))&leadType=(leadType:SPONSORED)`
    return await ky
      .get(this.baseUrl + '/rest/leadNotifications?' + query, {
        headers: this.getHeaders(),
      })
      .json<ListLeadNotificationSubscriptionsResponse>()
  }

  async createLeadNotificationSubscription(params: {
    webhook: string
    organizationId?: string
    sponsoredAccountId?: string
    leadType?: 'SPONSORED'
  }): Promise<GetLeadNotificationSubscriptionResponse> {
    const actualLeadType = params.leadType ?? 'SPONSORED'

    // Build the owner object based on lead type
    let owner: { organization?: string; sponsoredAccount?: string }
    if (actualLeadType === 'SPONSORED' && params.sponsoredAccountId) {
      owner = {
        sponsoredAccount: `urn:li:sponsoredAccount:${params.sponsoredAccountId}`,
      }
    } else if (params.organizationId) {
      owner = {
        organization: `urn:li:organization:${params.organizationId}`,
      }
    } else {
      throw new Error(
        actualLeadType === 'SPONSORED'
          ? 'sponsoredAccountId is required for SPONSORED lead type'
          : 'organizationId is required'
      )
    }

    const body = {
      webhook: params.webhook,
      owner,
      leadType: actualLeadType,
    }

    await ky
      .post(this.baseUrl + '/rest/leadNotifications', {
        headers: this.getHeaders(),
        json: body,
      })
      .json<GetLeadNotificationSubscriptionResponse>()

    const list = await this.listLeadNotificationSubscriptions({
      organizationId: params.organizationId,
      sponsoredAccountId: params.sponsoredAccountId,
    })
    const response = list.results.find((r) => r.webhook === params.webhook)
    if (!response) {
      throw new Error('Failed to create lead notification subscription')
    }
    return response
  }
}
