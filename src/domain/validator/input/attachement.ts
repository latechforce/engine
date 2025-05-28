import { z } from 'zod/v4'
import { baseInputValidator } from './base'

export const attachmentInputValidator = baseInputValidator.extend({
  type: z.literal('single-attachment'),
})
