import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../features/connection/domain/schema/oauth'

export const airtableConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('airtable'),
  })
  .meta({
    title: 'Airtable',
    description: 'The Airtable connection is a connection to the Airtable API',
  })

export type AirtableConnectionSchema = z.infer<typeof airtableConnectionSchema>
