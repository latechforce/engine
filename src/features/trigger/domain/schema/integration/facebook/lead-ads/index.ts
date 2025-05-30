// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { newLeadFacebookLeadAdsTriggerValidator } from './new-lead.schema'

export const facebookLeadAdsTriggerValidator = z
  .union([newLeadFacebookLeadAdsTriggerValidator])
  .meta({
    title: 'Facebook Lead Ads',
    description:
      'The Facebook Lead Ads trigger is a trigger that is used to interact with the Facebook Lead Ads API',
  })

export type FacebookLeadAdsTriggerSchema = z.infer<typeof facebookLeadAdsTriggerValidator>
