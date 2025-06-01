// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { baseInputSchema } from './base'

export const textInputSchema = baseInputSchema
  .extend({
    defaultValue: z.string().optional(),
    placeholder: z.string().optional(),
    type: z.enum(['single-line-text', 'long-text', 'phone-number', 'email', 'url']),
  })
  .meta({
    title: 'Text Input',
    description: 'The text input is a input that can contain a text',
  })

export type TextInputSchema = z.infer<typeof textInputSchema>
