// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { baseIntegrationTriggerSchema } from '../base'

export const baseCalendlyTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('calendly'),
})
