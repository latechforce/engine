import { z } from 'zod/v4'
import { codeActionValidator } from './code'
import { httpActionValidator } from './http'
import { filterActionValidator } from './filter'
import { pathsActionValidator } from './paths'

export const serviceActionValidator = z.union([
  codeActionValidator,
  httpActionValidator,
  filterActionValidator,
  pathsActionValidator,
])

export type ServiceActionSchema = z.infer<typeof serviceActionValidator>
