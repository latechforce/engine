import { z } from 'zod'
import { baseActionValidator } from '../base'

export const baseHttpActionValidator = baseActionValidator.extend({
  service: z.literal('http'),
})
