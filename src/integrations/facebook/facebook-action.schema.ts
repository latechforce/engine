import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../../features/action/domain/schema/base.integration'

const baseFacebookActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('facebook'),
})

const listAppSubscriptionsFacebookActionSchema = baseFacebookActionSchema
  .extend({
    action: z.literal('list-app-subscriptions'),
    params: z.object({
      appId: z.string().meta({ title: 'Facebook App ID' }),
    }),
  })
  .meta({
    title: 'List App Subscriptions',
    description: 'Lists subscriptions configured on the Facebook App',
  })

export const facebookActionSchema = z.union([listAppSubscriptionsFacebookActionSchema]).meta({
  title: 'Facebook',
  description: 'Actions to interact with Facebook APIs',
})

export type FacebookActionSchema = z.infer<typeof facebookActionSchema>
