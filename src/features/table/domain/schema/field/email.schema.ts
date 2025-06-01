import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const emailFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('email'),
    default: z.string().optional(),
  })
  .meta({
    title: 'Email',
    description: 'The email field is a field that can contain an email',
  })

export type EmailFieldSchema = z.infer<typeof emailFieldSchema>
