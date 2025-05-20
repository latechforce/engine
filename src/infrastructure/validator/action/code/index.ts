import { z } from 'zod'
import { runTypescriptCodeActionValidator } from './run-typescript.validator'
import { runJavascriptCodeActionValidator } from './run-javascript.validator'

export const codeActionValidator = z.union([
  runTypescriptCodeActionValidator,
  runJavascriptCodeActionValidator,
])

export type CodeActionSchema = z.infer<typeof codeActionValidator>
