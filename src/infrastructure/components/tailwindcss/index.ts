import type { Components } from '/domain/components'
import { Page } from '../Page'
import { Form } from './Form/Form'
import { SingleLineTextInput } from './Form/Input/SingleLineTextInput'
import { FormResponse } from './Form/FormResponse'
import { CheckboxInput } from './Form/Input/CheckboxInput'
import { SingleSelectInput } from './Form/Input/SingleSelectInput'
import { MultipleAttachmentInput } from './Form/Input/MultipleAttachmentInput'

export const components: Components = {
  Page,
  Form,
  FormResponse,
  SingleLineTextInput,
  SingleSelectInput,
  CheckboxInput,
  MultipleAttachmentInput,
}
