import { z } from 'zod/v4'
import { responseHttpActionValidator } from './response.validator'

export const httpActionValidator = responseHttpActionValidator.meta({
  title: 'HTTP',
  description: 'The HTTP action is an action that is performed by the automation',
})

export type HttpActionSchema = z.infer<typeof httpActionValidator>
