import { z } from 'zod'
import { baseCodeActionValidator } from './base'

export const runTypescriptCodeActionValidator = baseCodeActionValidator.extend({
  action: z.literal('run-typescript'),
  inputData: z.record(z.string(), z.string()).default({}).optional(),
  code: z.string(),
})

export type RunTypescriptCodeActionSchema = z.infer<typeof runTypescriptCodeActionValidator>
