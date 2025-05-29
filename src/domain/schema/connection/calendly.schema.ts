import { z } from 'zod/v4'
import { baseConnectionValidator } from './base'

export const calendlyConnectionValidator = baseConnectionValidator
  .extend({
    service: z.literal('calendly'),
    clientId: z.string(),
    clientSecret: z.string(),
  })
  .meta({
    title: 'Calendly',
    description: 'The Calendly connection is a connection to the Calendly API',
  })

export type CalendlyConnectionSchema = z.infer<typeof calendlyConnectionValidator>
