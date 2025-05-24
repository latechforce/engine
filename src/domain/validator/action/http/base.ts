import { z } from 'zod/v4'
import { baseActionValidator } from '../base'

export const baseHttpActionValidator = baseActionValidator.extend({
  service: z.literal('http'),
})
