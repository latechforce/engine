import { z } from 'zod/v4'
import { baseIntegrationActionValidator } from '../base'

export const baseCalendlyActionValidator = baseIntegrationActionValidator.extend({
  service: z.literal('calendly'),
})
