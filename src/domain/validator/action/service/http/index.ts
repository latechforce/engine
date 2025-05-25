import { z } from 'zod/v4'
import { getHttpActionValidator } from './get.validator'
import { responseHttpActionValidator } from './response.validator'
import { postHttpActionValidator } from './post.validator'

export const httpActionValidator = z
  .union([getHttpActionValidator, postHttpActionValidator, responseHttpActionValidator])
  .meta({
    title: 'HTTP',
    description: 'The HTTP action is an action that is performed by the automation',
  })

export type HttpActionSchema = z.infer<typeof httpActionValidator>
