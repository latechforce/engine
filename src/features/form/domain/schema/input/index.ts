// Third-party imports
import { z } from 'zod/v4'

// Form domain imports
import { attachmentInputValidator } from './attachement.schema'
import { checkboxInputValidator } from './checkbox.schema'
import { selectInputValidator } from './select.schema'
import { textInputValidator } from './text.schema'

export const inputValidator = z
  .union([
    textInputValidator,
    checkboxInputValidator,
    selectInputValidator,
    attachmentInputValidator,
  ])
  .meta({
    title: 'Input',
    description: 'The input is a input of a form',
  })

export type InputSchema = z.infer<typeof inputValidator>
