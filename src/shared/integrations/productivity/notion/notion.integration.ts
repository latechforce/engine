import { Client } from '@notionhq/client'
import type {
  CreatePageParameters,
  GetPageParameters,
  UpdatePageParameters,
  PageObjectResponse,
  QueryDataSourceParameters,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints'

export class NotionIntegration {
  private readonly client: Client

  constructor(accessToken: string) {
    this.client = new Client({
      auth: accessToken,
    })
  }

  async createPage(request: CreatePageParameters): Promise<PageObjectResponse> {
    const response = await this.client.pages.create(request)
    return response as PageObjectResponse
  }

  async getPage(request: GetPageParameters): Promise<PageObjectResponse> {
    const response = await this.client.pages.retrieve(request)
    return response as PageObjectResponse
  }

  async updatePage(request: UpdatePageParameters): Promise<PageObjectResponse> {
    const response = await this.client.pages.update(request)
    return response as PageObjectResponse
  }

  async deletePage(pageId: string): Promise<PageObjectResponse> {
    // In Notion API, deleting is done by archiving the page
    const response = await this.client.pages.update({
      page_id: pageId,
      archived: true,
    })
    return response as PageObjectResponse
  }

  async listPages(request: QueryDataSourceParameters): Promise<QueryDataSourceResponse> {
    // List pages by querying a database (now treated as a data source)
    const response = await this.client.dataSources.query(request)
    return response
  }

  async searchPages(
    query: string,
    _filter?: { property?: string; value?: string }
  ): Promise<Record<string, unknown>> {
    const response = await this.client.search({
      query,
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    })
    return response as Record<string, unknown>
  }
}
