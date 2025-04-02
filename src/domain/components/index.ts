import type { CheckboxInput } from './Form/Input/CheckboxInput'
import type { Form } from './Form'
import type { FormResponse } from './Form/FormResponse'
import type { TextInput } from './Form/Input/TextInput'
import type { SelectInput } from './Form/Input/SelectInput'
import type { Page } from './Page'
import type { FileInput } from './Form/Input/FileInput'
import type { TextareaInput } from './Form/Input/TextareaInput'

export type Components = {
  Page: Page
  Form: Form
  FormResponse: FormResponse
  TextInput: TextInput
  TextareaInput: TextareaInput
  SelectInput: SelectInput
  CheckboxInput: CheckboxInput
  FileInput: FileInput
}
