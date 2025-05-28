import { z } from 'zod/v4'
import { baseInputValidator } from './base'

export const attachmentInputValidator = baseInputValidator.extend({
  accept: z.string().optional(),
  type: z.literal('single-attachment'),
})
