// Third-party imports
import { z } from 'zod/v4'

// Trigger domain imports
import { baseIntegrationTriggerValidator } from '../base'

export const baseCalendlyTriggerValidator = baseIntegrationTriggerValidator.extend({
  service: z.literal('calendly'),
})
