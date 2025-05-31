import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../../base'

export const baseFacebookLeadAdsTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('facebook-lead-ads'),
})
