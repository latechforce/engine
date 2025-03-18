import type { CheckboxInput } from './Form/Input/CheckboxInput'
import type { Form } from './Form'
import type { FormResponse } from './Form/FormResponse'
import type { SingleLineTextInput } from './Form/Input/SingleLineTextInput'
import type { SingleSelectInput } from './Form/Input/SingleSelectInput'
import type { Page } from './Page'
import type { MultipleAttachmentInput } from './Form/Input/MultipleAttachmentInput'

export type Components = {
  Page: Page
  Form: Form
  FormResponse: FormResponse
  SingleLineTextInput: SingleLineTextInput
  SingleSelectInput: SingleSelectInput
  CheckboxInput: CheckboxInput
  MultipleAttachmentInput: MultipleAttachmentInput
}
