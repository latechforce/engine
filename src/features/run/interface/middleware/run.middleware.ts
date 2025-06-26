import { z } from 'zod/v4'
import { zValidator } from '@hono/zod-validator'

export const getRunsQuerySchema = z.object({
  q: z.string().optional(),
})

export const getRunsQueryValidator = zValidator('query', getRunsQuerySchema)
