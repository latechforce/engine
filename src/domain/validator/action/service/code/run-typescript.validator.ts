import { z } from 'zod/v4'
import { baseCodeActionValidator } from './base'

export const runTypescriptCodeActionValidator = baseCodeActionValidator
  .extend({
    action: z.literal('run-typescript'),
    inputData: z.record(z.string(), z.string()).default({}).optional(),
    code: z.string(),
  })
  .meta({
    title: 'Run Typescript',
    description:
      'The run typescript code action is a code action that is performed by the automation',
  })

export type RunTypescriptCodeActionSchema = z.infer<typeof runTypescriptCodeActionValidator>
