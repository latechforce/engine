import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../features/trigger/domain/schema/base.integration'

export const baseFacebookAdsTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('facebook-ads'),
})

export const newLeadFacebookAdsTriggerSchema = baseFacebookAdsTriggerSchema
  .extend({
    event: z.literal('new-lead'),
    params: z.object({
      pageId: z.string().meta({ title: 'Facebook Page ID' }),
      appId: z.string().meta({ title: 'Facebook App ID' }),
    }),
  })
  .meta({
    title: 'New Lead',
    description: 'Triggered when a new Facebook Lead Ad response is created',
  })

export const facebookAdsTriggerSchema = z.union([newLeadFacebookAdsTriggerSchema]).meta({
  title: 'Facebook',
  description: 'The Facebook trigger is triggered by Facebook lead events',
})

export type FacebookAdsTriggerSchema = z.infer<typeof facebookAdsTriggerSchema>
