import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../../../../features/connection/domain/schema/oauth'

export const linkedinConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('linkedin-ads'),
  })
  .meta({
    title: 'LinkedIn Ads',
    description: 'The LinkedIn Ads connection is a connection to the LinkedIn Ads API',
  })

export type LinkedinConnectionSchema = z.infer<typeof linkedinConnectionSchema>
