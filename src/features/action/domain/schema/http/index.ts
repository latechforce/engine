import { z } from 'zod/v4'
import { getHttpActionSchema } from './get.schema'
import { responseHttpActionSchema } from './response.schema'
import { postHttpActionSchema } from './post.schema'

export const httpActionSchema = z
  .union([getHttpActionSchema, postHttpActionSchema, responseHttpActionSchema])
  .meta({
    title: 'HTTP',
    description: 'The HTTP action is an action that is performed by the automation',
  })

export type HttpActionSchema = z.infer<typeof httpActionSchema>
