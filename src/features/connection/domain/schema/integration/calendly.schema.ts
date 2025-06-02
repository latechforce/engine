import { z } from 'zod/v4'
import { oauthConnectionSchema } from '../oauth'

export const calendlyConnectionSchema = oauthConnectionSchema
  .extend({
    service: z.literal('calendly'),
  })
  .meta({
    title: 'Calendly',
    description: 'The Calendly connection is a connection to the Calendly API',
  })

export type CalendlyConnectionSchema = z.infer<typeof calendlyConnectionSchema>
