import { z } from 'zod/v4'
import { getHttpActionValidator } from './get.schema'
import { responseHttpActionValidator } from './response.schema'
import { postHttpActionValidator } from './post.schema'

export const httpActionValidator = z
  .union([getHttpActionValidator, postHttpActionValidator, responseHttpActionValidator])
  .meta({
    title: 'HTTP',
    description: 'The HTTP action is an action that is performed by the automation',
  })

export type HttpActionSchema = z.infer<typeof httpActionValidator>
