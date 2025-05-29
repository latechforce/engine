import { z } from 'zod/v4'
import { attachmentInputValidator } from './attachement.schema'
import { checkboxInputValidator } from './checkbox.schema'
import { textInputValidator } from './text.schema'
import { selectInputValidator } from './select.schema'

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
