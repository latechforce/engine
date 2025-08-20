import ky from 'ky'
import type {
  CreateWebhookResponse,
  ListWebhooksResponse,
  WebhookSpecification,
  ListWebhookPayloadsResponse,
} from './airtable.types'

export class AirtableIntegration {
  private readonly baseUrl = 'https://api.airtable.com'

  constructor(private readonly accessToken: string) {}

  private getTokenHeader() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  async listWebhooks({ baseId }: { baseId: string }): Promise<ListWebhooksResponse> {
    const response = await ky.get(this.baseUrl + `/v0/bases/${baseId}/webhooks`, {
      headers: this.getTokenHeader(),
    })
    return response.json<ListWebhooksResponse>()
  }

  async listWebhookPayloads({
    baseId,
    webhookId,
    cursor,
    limit,
  }: {
    baseId: string
    webhookId: string
    cursor?: number
    limit?: number
  }): Promise<ListWebhookPayloadsResponse> {
    const searchParams: Record<string, string> = {}
    if (cursor !== undefined) searchParams.cursor = String(cursor)
    if (limit !== undefined) searchParams.limit = String(limit)
    const response = await ky.get(
      this.baseUrl + `/v0/bases/${baseId}/webhooks/${webhookId}/payloads`,
      {
        headers: this.getTokenHeader(),
        searchParams,
      }
    )
    return response.json<ListWebhookPayloadsResponse>()
  }

  async createWebhook(body: {
    baseId: string
    notificationUrl: string
    specification: WebhookSpecification
  }): Promise<CreateWebhookResponse> {
    const { baseId, notificationUrl, specification } = body
    return await ky
      .post(this.baseUrl + `/v0/bases/${baseId}/webhooks`, {
        json: {
          notificationUrl,
          specification,
        },
        headers: this.getTokenHeader(),
      })
      .json<CreateWebhookResponse>()
  }
}
