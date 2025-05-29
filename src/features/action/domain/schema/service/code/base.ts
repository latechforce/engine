import { z } from 'zod/v4'
import { baseActionValidator } from '../../base'

export const baseCodeActionValidator = baseActionValidator.extend({
  service: z.literal('code'),
})
