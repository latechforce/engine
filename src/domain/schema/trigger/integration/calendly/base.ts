import { z } from 'zod/v4'
import { baseIntegrationTriggerValidator } from '../base'

export const baseCalendlyTriggerValidator = baseIntegrationTriggerValidator.extend({
  service: z.literal('calendly'),
})
