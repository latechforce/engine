import { zValidator } from '@hono/zod-validator'
import { z } from 'zod/v4'

const createSingleRecordJsonSchema = z.object({
  fields: z.record(z.string(), z.unknown()),
})

const createMultipleRecordsJsonSchema = z.object({
  records: z.array(z.object({ fields: z.record(z.string(), z.unknown()) })),
})

const createRecordJsonSchema = z.union([
  createSingleRecordJsonSchema,
  createMultipleRecordsJsonSchema,
])

export const createRecordJsonValidator = zValidator('json', createRecordJsonSchema)

const createRecordFormSchema = z.record(z.string(), z.string().or(z.instanceof(File)))

export const createRecordFormValidator = zValidator('form', createRecordFormSchema)

const updateRecordJsonSchema = z.object({
  fields: z.record(z.string(), z.unknown()),
})

export const updateRecordJsonValidator = zValidator('json', updateRecordJsonSchema)

const updateRecordFormSchema = z.record(z.string(), z.string().or(z.instanceof(File)))

export const updateRecordFormValidator = zValidator('form', updateRecordFormSchema)

const deleteRecordsQuerySchema = z.object({
  ids: z.array(z.string()).or(z.string()),
})

export const deleteRecordsQueryValidator = zValidator('query', deleteRecordsQuerySchema)
