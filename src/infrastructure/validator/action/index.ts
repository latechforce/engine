import { z } from 'zod'
import { codeActionValidator } from './code'
import { httpActionValidator } from './http'

export const actionValidator = z.union([codeActionValidator, httpActionValidator])

export type ActionSchema = z.infer<typeof actionValidator>
