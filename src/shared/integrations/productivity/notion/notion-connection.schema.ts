import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../../../features/connection/domain/schema/oauth'

export const notionConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('notion'),
  })
  .meta({
    title: 'Notion',
    description: 'The Notion connection is a connection to the Notion API',
  })

export type NotionConnectionSchema = z.infer<typeof notionConnectionSchema>
