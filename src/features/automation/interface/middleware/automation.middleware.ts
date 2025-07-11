import { z } from 'zod/v4'
import { zValidator } from '@hono/zod-validator'

export const setStatusSchema = z.object({
  active: z.boolean(),
})

export const setStatusValidator = zValidator('json', setStatusSchema)

export const automationPostJsonSchema = z
  .record(z.string(), z.unknown())
  .or(z.array(z.record(z.string(), z.unknown())))

export const automationPostJsonValidator = zValidator('json', automationPostJsonSchema)

export const automationPostFormSchema = z.record(z.string(), z.string().or(z.instanceof(File)))

export const automationPostFormValidator = zValidator('form', automationPostFormSchema)

export const getAutomationsQuerySchema = z.object({
  q: z.string().optional(),
})

export const getAutomationsQueryValidator = zValidator('query', getAutomationsQuerySchema)
