import { z } from 'zod/v4'
import { codeActionValidator } from './code'
import { httpActionValidator } from './http'

export const serviceActionValidator = z.union([codeActionValidator, httpActionValidator])

export type ServiceActionSchema = z.infer<typeof serviceActionValidator>
