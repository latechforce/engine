import type { CheckboxInput } from './CheckboxInput'
import type { MultipleAttachmentInput } from './MultipleAttachmentInput'
import type { SingleLineTextInput } from './SingleLineTextInput'
import type { SingleSelectInput } from './SingleSelectInput'
import type { LongTextInput } from './LongTextInput'
export type Input =
  | SingleLineTextInput
  | CheckboxInput
  | SingleSelectInput
  | MultipleAttachmentInput
  | LongTextInput
