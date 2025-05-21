import { z } from 'zod/v4'
import { runTypescriptCodeActionValidator } from './run-typescript.validator'
import { runJavascriptCodeActionValidator } from './run-javascript.validator'

export const codeActionValidator = z
  .union([runTypescriptCodeActionValidator, runJavascriptCodeActionValidator])
  .meta({
    title: 'Code',
    description: 'The code action is a code action that is performed by the automation',
  })

export type CodeActionSchema = z.infer<typeof codeActionValidator>
