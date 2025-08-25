import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../../../../features/trigger/domain/schema/base.integration'

export const baseLinkedinTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('linkedin-ads'),
})

export const newLeadGenFormResponseLinkedinTriggerSchema = baseLinkedinTriggerSchema
  .extend({
    event: z.literal('new-lead-gen-form-response'),
    params: z
      .object({
        organizationId: z.string().optional().meta({
          title: 'LinkedIn Organization ID',
          description: 'Required for non-sponsored lead forms',
        }),
        sponsoredAccountId: z.string().optional().meta({
          title: 'LinkedIn Sponsored Account ID',
          description: 'Required for sponsored lead forms (leadType: SPONSORED)',
        }),
        leadType: z.enum(['SPONSORED']).optional().meta({
          default: 'SPONSORED',
          description: 'Type of lead form. SPONSORED requires sponsoredAccountId',
        }),
      })
      .refine(
        (data) => {
          // If leadType is SPONSORED, sponsoredAccountId is required
          // Otherwise, organizationId is required
          if (data.leadType === 'SPONSORED') {
            return !!data.sponsoredAccountId
          }
          return !!data.organizationId
        },
        {
          message:
            'SPONSORED leadType requires sponsoredAccountId, other types require organizationId',
        }
      ),
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
