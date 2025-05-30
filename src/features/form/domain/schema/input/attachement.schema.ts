// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { baseInputValidator } from './base'

export const attachmentInputValidator = baseInputValidator.extend({
  accept: z.string().optional(),
  type: z.literal('single-attachment'),
})

export type AttachmentInputSchema = z.infer<typeof attachmentInputValidator>
