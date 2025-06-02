import { z } from 'zod/v4'
import { baseConnectionSchema } from '../base'

export const youcanbookmeConnectionSchema = baseConnectionSchema
  .extend({
    service: z.literal('youcanbookme'),
    baseUrl: z.string(),
    username: z.string(),
    password: z.string(),
  })
  .meta({
    title: 'YouCanBookMe',
    description: 'The YouCanBookMe connection is a connection to the YouCanBookMe API',
  })

export type YouCanBookMeConnectionSchema = z.infer<typeof youcanbookmeConnectionSchema>
