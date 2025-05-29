import { z } from 'zod/v4'
import { baseConnectionValidator } from '../base'

export const youcanbookmeConnectionValidator = baseConnectionValidator
  .extend({
    service: z.literal('youcanbookme'),
  })
  .meta({
    title: 'YouCanBookMe',
    description: 'The YouCanBookMe connection is a connection to the YouCanBookMe API',
  })

export type YouCanBookMeConnectionSchema = z.infer<typeof youcanbookmeConnectionValidator>
