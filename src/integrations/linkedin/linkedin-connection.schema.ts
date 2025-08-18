import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../features/connection/domain/schema/oauth'

export const linkedinConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('linkedin'),
  })
  .meta({
    title: 'LinkedIn',
    description: 'The LinkedIn connection is a connection to the LinkedIn API',
  })

export type LinkedinConnectionSchema = z.infer<typeof linkedinConnectionSchema>
