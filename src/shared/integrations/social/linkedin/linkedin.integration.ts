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

    const createResponse = await ky
      .post(this.baseUrl + '/rest/leadNotifications', {
        headers: this.getHeaders(),
        json: body,
      })
      .json<GetLeadNotificationSubscriptionResponse>()

    // If the create response is valid, return it directly
    if (createResponse && createResponse.webhook) {
      return createResponse
    }

    // Fallback: try to find the subscription in the list
    const listResponse = await this.listLeadNotificationSubscriptions({
      organizationId: params.organizationId,
      sponsoredAccountId: params.sponsoredAccountId,
    })
    console.log('LinkedIn API list response:', JSON.stringify(listResponse, null, 2))

    // LinkedIn API might return either 'results' or 'elements' array
    const subscriptions = listResponse?.results || listResponse?.elements || []

    // Check if we have a valid array of subscriptions
    if (!Array.isArray(subscriptions)) {
      throw new Error(
        `Failed to create lead notification subscription - invalid response structure from LinkedIn API. Response: ${JSON.stringify(listResponse)}`
      )
    }

    const response = subscriptions.find((r) => r.webhook === params.webhook)
    if (!response) {
      throw new Error(
        `Failed to create lead notification subscription - subscription not found after creation. Available webhooks: ${subscriptions.map((s) => s.webhook).join(', ')}`
      )
    }
    return response
  }
}
