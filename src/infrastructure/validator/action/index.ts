import { z } from 'zod/v4'
import { codeActionValidator } from './code'
import { httpActionValidator } from './http'

export const actionValidator = z.union([codeActionValidator, httpActionValidator]).meta({
  title: 'Action',
  description: 'The action is an action that is performed by the automation',
})

export type ActionSchema = z.infer<typeof actionValidator>
