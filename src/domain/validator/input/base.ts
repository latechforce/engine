import { z } from 'zod/v4'

export const baseInputValidator = z.object({
  name: z.string(),
  label: z.string().optional(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  type: z.enum([
    'single-line-text',
    'long-text',
    'phone',
    'email',
    'url',
    'checkbox',
    'single-attachment',
  ]),
})
