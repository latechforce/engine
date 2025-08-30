import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import type { NotionActionSchema } from './notion-action.schema'
import type {
  CreatePageParameters,
  UpdatePageParameters,
  GetPageParameters,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionIntegration } from './notion.integration'

export class NotionActionIntegration {
  constructor(private readonly schema: NotionActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const notion = new NotionIntegration(token.access_token)

    switch (this.schema.action) {
      case 'create-page': {
        const { parent, properties, children, icon, cover } = this.schema.params

        const createParams: CreatePageParameters = {
          parent: this.buildParent(parent),
          properties,
        }

        if (children !== undefined) createParams.children = children
        if (icon !== undefined) {
          if (icon.type === 'emoji') {
            createParams.icon = { emoji: icon.emoji as any } // eslint-disable-line @typescript-eslint/no-explicit-any
          } else if (icon.type === 'external') {
            createParams.icon = { external: icon.external }
          }
        }
        if (cover !== undefined && cover.external) {
          createParams.cover = { external: cover.external }
        }

        return notion.createPage(createParams)
      }

      case 'get-page': {
        const { pageId, filterProperties } = this.schema.params
        const getParams: GetPageParameters = { page_id: pageId }
        if (filterProperties) {
          getParams.filter_properties = filterProperties
        }
        return notion.getPage(getParams)
      }

      case 'update-page': {
        const { pageId, properties, icon, cover, archived } = this.schema.params

        const updateParams: UpdatePageParameters = {
          page_id: pageId,
        }

        if (properties !== undefined) updateParams.properties = properties
        if (archived !== undefined) updateParams.archived = archived

        if (icon !== undefined) {
          if (icon.type === 'emoji') {
            // The Notion API expects emoji to be an actual emoji character
            // We cast to any here since the validation happens at runtime
            updateParams.icon = { emoji: icon.emoji as any } // eslint-disable-line @typescript-eslint/no-explicit-any
          } else if (icon.type === 'external') {
            updateParams.icon = { external: icon.external }
          }
        }

        if (cover !== undefined && cover.external) {
          updateParams.cover = { external: cover.external }
        }

        return notion.updatePage(updateParams)
      }

      case 'delete-page': {
        const { pageId } = this.schema.params
        return notion.deletePage(pageId)
      }

      case 'list-pages': {
        const { databaseId, filter, sorts, startCursor, pageSize } = this.schema.params
        const queryParams: QueryDatabaseParameters = {
          database_id: databaseId,
        }
        if (filter !== undefined) queryParams.filter = filter
        if (sorts !== undefined) queryParams.sorts = sorts
        if (startCursor !== undefined) queryParams.start_cursor = startCursor
        if (pageSize !== undefined) queryParams.page_size = pageSize

        return notion.listPages(queryParams)
      }

      case 'search-pages': {
        const { query, filter } = this.schema.params
        return notion.searchPages(query, filter)
      }

      default: {
        const _exhaustiveCheck: never = this.schema
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }

  private buildParent(
    parent:
      | { type: 'database_id'; database_id: string }
      | { type: 'page_id'; page_id: string }
      | { type: 'workspace'; workspace: true }
  ): CreatePageParameters['parent'] {
    if (parent.type === 'database_id') {
      return { type: 'database_id', database_id: parent.database_id }
    } else if (parent.type === 'page_id') {
      return { type: 'page_id', page_id: parent.page_id }
    } else if (parent.type === 'workspace') {
      return { type: 'workspace', workspace: true }
    }
    throw new Error('Invalid parent type')
  }
}
