import { z } from 'zod/v4'
import { baseLinkedinAdsTriggerSchema } from './base'

export const newLeadGenFormResponseLinkedinAdsTriggerSchema = baseLinkedinAdsTriggerSchema
  .extend({
    event: z.literal('new-lead-gen-form-response'),
    path: z.string(),
  })
  .meta({
    title: 'New Lead Gen Form Response',
    description:
      'The LinkedIn Ads new lead gen form response trigger is a trigger that is used to trigger an automation when a new lead gen form response is created',
  })

export type NewLeadGenFormResponseLinkedinAdsTriggerSchema = z.infer<
  typeof newLeadGenFormResponseLinkedinAdsTriggerSchema
>
