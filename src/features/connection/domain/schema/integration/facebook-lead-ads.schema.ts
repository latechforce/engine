import { z } from 'zod/v4'
import { baseConnectionValidator } from '../base'

export const facebookLeadAdsConnectionValidator = baseConnectionValidator
  .extend({
    service: z.literal('facebook-lead-ads'),
  })
  .meta({
    title: 'Facebook Lead Ads',
    description: 'The Facebook Lead Ads connection is a connection to the Facebook Lead Ads API',
  })

export type FacebookLeadAdsConnectionSchema = z.infer<typeof facebookLeadAdsConnectionValidator>
