import { z } from 'zod/v4'
import { baseCodeActionValidator } from './base'

export const runJavascriptCodeActionValidator = baseCodeActionValidator
  .extend({
    action: z.literal('run-javascript'),
    inputData: z.record(z.string(), z.string()).default({}).optional(),
    code: z.string(),
  })
  .meta({
    title: 'Run Javascript',
    description:
      'The run javascript code action is a code action that is performed by the automation',
  })

export type RunJavascriptCodeActionSchema = z.infer<typeof runJavascriptCodeActionValidator>
