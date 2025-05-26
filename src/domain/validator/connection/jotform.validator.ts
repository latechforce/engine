import { z } from 'zod/v4'
import { baseConnectionValidator } from './base'

export const jotformConnectionValidator = baseConnectionValidator
  .extend({
    service: z.literal('jotform'),
  })
  .meta({
    title: 'Jotform',
    description: 'The Jotform connection is a connection to the Jotform API',
  })

export type JotformConnectionSchema = z.infer<typeof jotformConnectionValidator>
