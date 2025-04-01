import type { Components } from '/domain/components'
import { Page } from '../Page'
import { Form } from './Form/Form'
import { SingleLineTextInput } from './Form/Input/SingleLineTextInput'
import { FormResponse } from './Form/FormResponse'
import { CheckboxInput } from './Form/Input/CheckboxInput'
import { SingleSelectInput } from './Form/Input/SingleSelectInput'
import { MultipleAttachmentInput } from './Form/Input/MultipleAttachmentInput'
import { LongTextInput } from './Form/Input/LongTextInput'
import { EmailInput } from './Form/Input/EmailInput'

export const components: Components = {
  Page,
  Form,
  FormResponse,
  SingleLineTextInput,
  LongTextInput,
  SingleSelectInput,
  CheckboxInput,
  MultipleAttachmentInput,
  EmailInput,
}
