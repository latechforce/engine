import { z } from 'zod/v4'
import { codeActionSchema } from './code'
import { httpActionSchema } from './http'
import { filterActionSchema } from './filter'
import { pathsActionSchema } from './paths'

export const serviceActionSchema = z.union([
  codeActionSchema,
  httpActionSchema,
  filterActionSchema,
  pathsActionSchema,
])

export type ServiceActionSchema = z.infer<typeof serviceActionSchema>
