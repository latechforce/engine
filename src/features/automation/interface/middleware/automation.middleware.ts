import { z } from 'zod/v4'
import { zValidator } from '@hono/zod-validator'

export const setStatusSchema = z.object({
  active: z.boolean(),
})

export const setStatusValidator = zValidator('json', setStatusSchema)

export const automationPostJsonSchema = z.record(z.string(), z.unknown())

export const automationPostJsonValidator = zValidator('json', automationPostJsonSchema)

export const automationPostFormSchema = z.record(z.string(), z.string().or(z.instanceof(File)))

export const automationPostFormValidator = zValidator('form', automationPostFormSchema)
