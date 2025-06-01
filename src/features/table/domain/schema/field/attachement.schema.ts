import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const attachementFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('single-attachment'),
  })
  .meta({
    title: 'Single Attachment Field',
    description: 'The single attachment field is a field that can contain a single attachment',
  })

export type AttachementFieldSchema = z.infer<typeof attachementFieldSchema>
