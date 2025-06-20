import { z } from 'zod/v4'
import { baseCodeActionSchema } from './base'

export const runJavascriptCodeActionSchema = baseCodeActionSchema
  .extend({
    action: z.literal('run-javascript'),
    params: z.object({
      inputData: z.record(z.string(), z.string()).default({}).optional(),
      code: z.string(),
    }),
  })
  .meta({
    title: 'Run Javascript',
    description:
      'The run javascript code action is a code action that is performed by the automation',
  })

export type RunJavascriptCodeActionSchema = z.infer<typeof runJavascriptCodeActionSchema>
