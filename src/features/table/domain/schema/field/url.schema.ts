import { z } from 'zod/v4'
import { baseFieldSchema } from './base'

export const urlFieldSchema = baseFieldSchema
  .extend({
    type: z.literal('url'),
    default: z.string().optional(),
  })
  .meta({
    title: 'URL',
    description: 'The URL field is a field that can contain a URL',
  })

export type UrlFieldSchema = z.infer<typeof urlFieldSchema>
