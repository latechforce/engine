import type { CheckboxInput } from './CheckboxInput'
import type { MultipleAttachmentInput } from './MultipleAttachmentInput'
import type { SingleLineTextInput } from './SingleLineTextInput'
import type { SingleSelectInput } from './SingleSelectInput'

export type Input =
  | SingleLineTextInput
  | CheckboxInput
  | SingleSelectInput
  | MultipleAttachmentInput
