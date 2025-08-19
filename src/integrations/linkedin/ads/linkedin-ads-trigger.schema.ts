import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../features/trigger/domain/schema/base.integration'

export const baseLinkedinTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('linkedin-ads'),
})

export const newLeadGenFormResponseLinkedinTriggerSchema = baseLinkedinTriggerSchema
  .extend({
    event: z.literal('new-lead-gen-form-response'),
    params: z.object({
      organizationId: z.string().meta({
        title: 'LinkedIn Organization ID',
      }),
      leadType: z.enum(['SPONSORED']).optional().meta({
        default: 'SPONSORED',
      }),
    }),
  })
  .meta({
    title: 'New Lead Gen Form Response',
    description: 'Triggered when a new LinkedIn Lead Gen Form response is created',
  })

export const linkedinAdsTriggerSchema = z
  .union([newLeadGenFormResponseLinkedinTriggerSchema])
  .meta({
    title: 'LinkedIn Ads',
    description: 'The LinkedIn Ads trigger is triggered by LinkedIn lead events',
  })

export type LinkedinAdsTriggerSchema = z.infer<typeof linkedinAdsTriggerSchema>
