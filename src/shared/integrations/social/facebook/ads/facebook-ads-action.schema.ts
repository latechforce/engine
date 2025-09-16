import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../../../../features/action/domain/schema/base.integration'

const baseFacebookActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('facebook-ads'),
})

const listAppSubscriptionsFacebookActionSchema = baseFacebookActionSchema
  .extend({
    action: z.literal('list-app-subscriptions'),
    params: z.object({
      appId: z.string().meta({ title: 'Facebook App ID' }),
      appSecret: z.string().meta({ title: 'Facebook App Secret' }),
    }),
  })
  .meta({
    title: 'List App Subscriptions',
    description: 'Lists subscriptions configured on the Facebook App',
  })

const getLeadgenFacebookActionSchema = baseFacebookActionSchema
  .extend({
    action: z.literal('get-leadgen'),
    params: z.object({
      leadgenId: z
        .string()
        .meta({ title: 'Leadgen ID', description: 'The leadgen_id from Facebook webhook data' }),
    }),
  })
  .meta({
    title: 'Get LeadGen',
    description: 'Retrieves lead generation data using the leadgen_id from webhook',
  })

export const facebookActionSchema = z
  .union([listAppSubscriptionsFacebookActionSchema, getLeadgenFacebookActionSchema])
  .meta({
    title: 'Facebook Ads',
    description: 'Actions to interact with Facebook Ads APIs',
  })

export type FacebookActionSchema = z.infer<typeof facebookActionSchema>
