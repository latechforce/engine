import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../../features/connection/domain/schema/oauth'

export const facebookLeadAdsConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('facebook-lead-ads'),
  })
  .meta({
    title: 'Facebook Lead Ads',
    description: 'The Facebook Lead Ads connection is a connection to the Facebook Lead Ads API',
  })

export type FacebookLeadAdsConnectionSchema = z.infer<typeof facebookLeadAdsConnectionSchema>
