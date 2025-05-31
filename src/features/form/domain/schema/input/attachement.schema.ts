// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { baseInputSchema } from './base'

export const attachmentInputSchema = baseInputSchema.extend({
  accept: z.string().optional(),
  type: z.literal('single-attachment'),
})

export type AttachmentInputSchema = z.infer<typeof attachmentInputSchema>
