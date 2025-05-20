import { z } from 'zod'
import { baseCodeActionValidator } from './base'

export const runJavascriptCodeActionValidator = baseCodeActionValidator.extend({
  action: z.literal('run-javascript'),
  inputData: z.record(z.string(), z.string()).default({}).optional(),
  code: z.string(),
})

export type RunJavascriptCodeActionSchema = z.infer<typeof runJavascriptCodeActionValidator>
