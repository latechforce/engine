import { z } from 'zod/v4'
import { baseIntegrationTriggerValidator } from '../../base'

export const baseLinkedinAdsTriggerValidator = baseIntegrationTriggerValidator.extend({
  service: z.literal('linkedin-ads'),
})
