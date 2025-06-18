// Third-party imports
import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../features/trigger/domain/schema/base.integration'

export const baseFacebookLeadAdsTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('facebook-lead-ads'),
})

export const newLeadFacebookLeadAdsTriggerSchema = baseFacebookLeadAdsTriggerSchema
  .extend({
    event: z.literal('new-lead'),
    newLeadFacebookLeadAds: z.object({}).optional(),
  })
  .meta({
    title: 'New Lead',
    description:
      'The Facebook Lead Ads new lead trigger is a trigger that is used to trigger an automation when a new lead is created',
  })

export const facebookLeadAdsTriggerSchema = z.union([newLeadFacebookLeadAdsTriggerSchema]).meta({
  title: 'Facebook Lead Ads',
  description:
    'The Facebook Lead Ads trigger is a trigger that is used to interact with the Facebook Lead Ads API',
})

export type FacebookLeadAdsTriggerSchema = z.infer<typeof facebookLeadAdsTriggerSchema>
