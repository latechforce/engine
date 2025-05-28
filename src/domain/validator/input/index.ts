import { z } from 'zod/v4'
import { attachmentInputValidator } from './attachement'
import { checkboxInputValidator } from './checkbox'
import { textInputValidator } from './text'
import { selectInputValidator } from './select'

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
