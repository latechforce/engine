import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../features/connection/domain/schema/oauth'

export const facebookConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('facebook-ads'),
  })
  .meta({
    title: 'Facebook Ads',
    description: 'The Facebook Ads connection is a connection to the Facebook Ads API',
  })

export type FacebookConnectionSchema = z.infer<typeof facebookConnectionSchema>
