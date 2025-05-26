import { z } from 'zod/v4'
import { codeActionValidator } from './code'
import { httpActionValidator } from './http'
import { filterActionValidator } from './filter'

export const serviceActionValidator = z.union([
  codeActionValidator,
  httpActionValidator,
  filterActionValidator,
])

export type ServiceActionSchema = z.infer<typeof serviceActionValidator>
