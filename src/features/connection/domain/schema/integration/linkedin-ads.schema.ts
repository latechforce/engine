import { z } from 'zod/v4'
import { baseConnectionSchema } from '../base'

export const linkedinAdsConnectionSchema = baseConnectionSchema
  .extend({
    service: z.literal('linkedin-ads'),
  })
  .meta({
    title: 'LinkedIn Ads',
    description: 'The LinkedIn Ads connection is a connection to the LinkedIn Ads API',
  })

export type LinkedInAdsConnectionSchema = z.infer<typeof linkedinAdsConnectionSchema>
