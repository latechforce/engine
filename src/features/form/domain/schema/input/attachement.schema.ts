// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { baseInputSchema } from './base'

export const attachmentInputSchema = baseInputSchema
  .extend({
    accept: z.string().optional(),
    type: z.literal('single-attachment'),
  })
  .meta({
    title: 'Attachment Input',
    description: 'The attachment input is a input that can contain a attachment',
  })

export type AttachmentInputSchema = z.infer<typeof attachmentInputSchema>
