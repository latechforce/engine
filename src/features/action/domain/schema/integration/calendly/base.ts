import { z } from 'zod/v4'
import { baseIntegrationActionSchema } from '../base'

export const baseCalendlyActionSchema = baseIntegrationActionSchema.extend({
  service: z.literal('calendly'),
})
