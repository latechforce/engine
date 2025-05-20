import { z } from 'zod'
import { baseActionValidator } from '../base'

export const baseCodeActionValidator = baseActionValidator.extend({
  service: z.literal('code'),
})
