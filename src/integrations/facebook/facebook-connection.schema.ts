import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../features/connection/domain/schema/oauth'

export const facebookConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('facebook'),
  })
  .meta({
    title: 'Facebook',
    description: 'The Facebook connection is a connection to the Facebook Graph API',
  })

export type FacebookConnectionSchema = z.infer<typeof facebookConnectionSchema>
