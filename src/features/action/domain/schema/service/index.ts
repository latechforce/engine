import { z } from 'zod/v4'
import { codeActionSchema } from './code'
import { httpActionSchema } from './http'
import { filterActionSchema } from './filter'

export const serviceActionSchema = z.union([codeActionSchema, httpActionSchema, filterActionSchema])

export type ServiceActionSchema = z.infer<typeof serviceActionSchema>
