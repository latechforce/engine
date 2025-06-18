import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../features/trigger/domain/schema/base.integration'

export const baseLinkedinAdsTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('linkedin-ads'),
})

export const newLeadGenFormResponseLinkedinAdsTriggerSchema = baseLinkedinAdsTriggerSchema
  .extend({
    event: z.literal('new-lead-gen-form-response'),
    newLeadGenFormResponseLinkedinAds: z.object({}).optional(),
  })
  .meta({
    title: 'New Lead Gen Form Response',
    description:
      'The LinkedIn Ads new lead gen form response trigger is a trigger that is used to trigger an automation when a new lead gen form response is created',
  })

export const linkedinAdsTriggerSchema = z
  .union([newLeadGenFormResponseLinkedinAdsTriggerSchema])
  .meta({
    title: 'LinkedIn Ads',
    description:
      'The LinkedIn Ads trigger is a trigger that is used to interact with the LinkedIn Ads API',
  })

export type LinkedInAdsTriggerSchema = z.infer<typeof linkedinAdsTriggerSchema>
