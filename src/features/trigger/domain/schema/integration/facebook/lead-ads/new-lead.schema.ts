import { z } from 'zod/v4'
import { baseFacebookLeadAdsTriggerSchema } from './base'

export const newLeadFacebookLeadAdsTriggerSchema = baseFacebookLeadAdsTriggerSchema
  .extend({
    event: z.literal('new-lead'),
    path: z.string(),
  })
  .meta({
    title: 'New Lead',
    description:
      'The Facebook Lead Ads new lead trigger is a trigger that is used to trigger an automation when a new lead is created',
  })

export type NewLeadFacebookLeadAdsTriggerSchema = z.infer<
  typeof newLeadFacebookLeadAdsTriggerSchema
>
