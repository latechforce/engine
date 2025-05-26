import { z } from 'zod/v4'
import { newLeadGenFormResponseLinkedinAdsTriggerValidator } from './new-lead-gen-form-response'

export const linkedinAdsTriggerValidator = z
  .union([newLeadGenFormResponseLinkedinAdsTriggerValidator])
  .meta({
    title: 'LinkedIn Ads',
    description:
      'The LinkedIn Ads trigger is a trigger that is used to interact with the LinkedIn Ads API',
  })

export type LinkedInAdsTriggerSchema = z.infer<typeof linkedinAdsTriggerValidator>
