import { z } from 'zod/v4'
import { newLeadGenFormResponseLinkedinAdsTriggerSchema } from './new-lead-gen-form-response.schema'

export const linkedinAdsTriggerSchema = z
  .union([newLeadGenFormResponseLinkedinAdsTriggerSchema])
  .meta({
    title: 'LinkedIn Ads',
    description:
      'The LinkedIn Ads trigger is a trigger that is used to interact with the LinkedIn Ads API',
  })

export type LinkedInAdsTriggerSchema = z.infer<typeof linkedinAdsTriggerSchema>
