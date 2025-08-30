import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../../features/action/domain/schema/base.integration'

const baseNotionActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('notion'),
})

const createPageNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('create-page'),
    params: z.object({
      parent: z
        .union([
          z.object({
            type: z.literal('database_id'),
            database_id: z.string(),
          }),
          z.object({
            type: z.literal('page_id'),
            page_id: z.string(),
          }),
          z.object({
            type: z.literal('workspace'),
            workspace: z.literal(true),
          }),
        ])
        .describe('Parent of the new page (database, page, or workspace)'),
      properties: z.record(z.string(), z.any()).describe('Page properties'),
      children: z.array(z.any()).optional().describe('Page content blocks'),
      icon: z
        .union([
          z.object({
            type: z.literal('emoji'),
            emoji: z.string(),
          }),
          z.object({
            type: z.literal('external'),
            external: z.object({
              url: z.string(),
            }),
          }),
        ])
        .optional()
        .describe('Page icon'),
      cover: z
        .object({
          type: z.literal('external'),
          external: z.object({
            url: z.string(),
          }),
        })
        .optional()
        .describe('Page cover image'),
    }),
  })
  .meta({
    title: 'Create Page',
    description: 'Creates a new page in Notion',
  })

const getPageNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('get-page'),
    params: z.object({
      pageId: z.string().describe('The ID of the page to retrieve'),
      filterProperties: z
        .array(z.string())
        .optional()
        .describe('Properties to include in response'),
    }),
  })
  .meta({
    title: 'Get Page',
    description: 'Retrieves a page from Notion',
  })

const updatePageNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('update-page'),
    params: z.object({
      pageId: z.string().describe('The ID of the page to update'),
      properties: z.record(z.string(), z.any()).optional().describe('Page properties to update'),
      icon: z
        .union([
          z.object({
            type: z.literal('emoji'),
            emoji: z.string(),
          }),
          z.object({
            type: z.literal('external'),
            external: z.object({
              url: z.string(),
            }),
          }),
        ])
        .optional()
        .describe('Page icon to set'),
      cover: z
        .object({
          type: z.literal('external'),
          external: z.object({
            url: z.string(),
          }),
        })
        .optional()
        .describe('Page cover image to set'),
      archived: z.boolean().optional().describe('Whether to archive/unarchive the page'),
    }),
  })
  .meta({
    title: 'Update Page',
    description: 'Updates properties, icon, cover, or archived status of a Notion page',
  })

const deletePageNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('delete-page'),
    params: z.object({
      pageId: z.string().describe('The ID of the page to delete (archive)'),
    }),
  })
  .meta({
    title: 'Delete Page',
    description: 'Deletes (archives) a page in Notion',
  })

const listPagesNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('list-pages'),
    params: z.object({
      databaseId: z.string().describe('The ID of the database to query'),
      filter: z.any().optional().describe('Filter conditions for the query'),
      sorts: z.array(z.any()).optional().describe('Sort conditions for the query'),
      startCursor: z.string().optional().describe('Pagination cursor'),
      pageSize: z.number().min(1).max(100).optional().describe('Number of results per page'),
    }),
  })
  .meta({
    title: 'List Pages',
    description: 'Lists pages from a Notion database',
  })

const searchPagesNotionActionSchema = baseNotionActionSchema
  .extend({
    action: z.literal('search-pages'),
    params: z.object({
      query: z.string().describe('Search query text'),
      filter: z
        .object({
          property: z.string().optional(),
          value: z.string().optional(),
        })
        .optional()
        .describe('Optional filter for search results'),
    }),
  })
  .meta({
    title: 'Search Pages',
    description: 'Searches for pages in Notion',
  })

export const notionActionSchema = z
  .union([
    createPageNotionActionSchema,
    getPageNotionActionSchema,
    updatePageNotionActionSchema,
    deletePageNotionActionSchema,
    listPagesNotionActionSchema,
    searchPagesNotionActionSchema,
  ])
  .meta({
    title: 'Notion',
    description: 'The Notion action is used to interact with the Notion API',
  })

export type NotionActionSchema = z.infer<typeof notionActionSchema>
