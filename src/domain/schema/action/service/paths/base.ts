import { z } from 'zod/v4'
import { baseActionValidator } from '../../base'

export const basePathsActionValidator = baseActionValidator.extend({
  service: z.literal('paths'),
})
