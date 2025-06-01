import { z } from 'zod/v4'
import { baseConnectionSchema } from '../base'

export const calendlyConnectionSchema = baseConnectionSchema
  .extend({
    service: z.literal('calendly'),
    clientId: z.string(),
    clientSecret: z.string(),
  })
  .meta({
    title: 'Calendly',
    description: 'The Calendly connection is a connection to the Calendly API',
  })

export type CalendlyConnectionSchema = z.infer<typeof calendlyConnectionSchema>
