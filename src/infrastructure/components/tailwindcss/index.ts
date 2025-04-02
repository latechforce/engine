import type { Components } from '/domain/components'
import { Page } from '../Page'
import { Form } from './Form/Form'
import { TextInput } from './Form/Input/TextInput'
import { FormResponse } from './Form/FormResponse'
import { CheckboxInput } from './Form/Input/CheckboxInput'
import { SelectInput } from './Form/Input/SelectInput'
import { FileInput } from './Form/Input/FileInput'
import { TextareaInput } from './Form/Input/TextareaInput'

export const components: Components = {
  Page,
  Form,
  FormResponse,
  TextInput,
  TextareaInput,
  SelectInput,
  CheckboxInput,
  FileInput,
}
