// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { attachmentInputSchema } from './attachement.schema'
import { checkboxInputSchema } from './checkbox.schema'
import { selectInputSchema } from './select.schema'
import { textInputSchema } from './text.schema'

export const inputSchema = z
  .union([textInputSchema, checkboxInputSchema, selectInputSchema, attachmentInputSchema])
  .meta({
    title: 'Input',
    description: 'The input is a input of a form',
  })

export type InputSchema = z.infer<typeof inputSchema>
