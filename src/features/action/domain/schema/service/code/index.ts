import { z } from 'zod/v4'
import { runTypescriptCodeActionSchema } from './run-typescript.schema'
import { runJavascriptCodeActionSchema } from './run-javascript.schema'

export const codeActionSchema = z
  .union([runTypescriptCodeActionSchema, runJavascriptCodeActionSchema])
  .meta({
    title: 'Code',
    description: 'The code action is a code action that is performed by the automation',
  })

export type CodeActionSchema = z.infer<typeof codeActionSchema>
