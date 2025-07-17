import { z } from 'zod/v4'
import { zValidator } from '@hono/zod-validator'

export const getRunsQuerySchema = z.object({
  search: z.string().optional(),
  pageIndex: z.string().optional(),
  pageSize: z.string().optional(),
  status: z.string().optional(),
})

export const getRunsQueryValidator = zValidator('query', getRunsQuerySchema)

export const getRunsReplayJsonSchema = z.object({
  runIds: z.array(z.string()),
})

export const getRunsReplayJsonValidator = zValidator('json', getRunsReplayJsonSchema)
