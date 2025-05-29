import { z } from 'zod/v4'
import { baseIntegrationTriggerValidator } from '../../base'

export const baseFacebookLeadAdsTriggerValidator = baseIntegrationTriggerValidator.extend({
  service: z.literal('facebook-lead-ads'),
})
