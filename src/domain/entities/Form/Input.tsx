import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table'
import type { Input as InputComponent } from '/domain/components/Form/Input'
import type { SingleLineTextInput } from '/domain/components/Form/Input/SingleLineTextInput'
import type { CheckboxInput } from '/domain/components/Form/Input/CheckboxInput'
import type { SingleSelectInput } from '/domain/components/Form/Input/SingleSelectInput'
import type { MultipleAttachmentInput } from '/domain/components/Form/Input/MultipleAttachmentInput'
import type { Field } from '/domain/entities/Field'
import type { LongTextInput } from '/domain/components/Form/Input/LongTextInput'
import type { EmailInput } from '/domain/components/Form/Input/EmailInput'

export interface InputConfig {
  field: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

export interface InputComponents {
  SingleLineTextInput: SingleLineTextInput
  LongTextInput: LongTextInput
  CheckboxInput: CheckboxInput
  SingleSelectInput: SingleSelectInput
  MultipleAttachmentInput: MultipleAttachmentInput
  EmailInput: EmailInput
}

export class Input {
  field: Field
  options: string[] = []
  InputComponent: InputComponent

  constructor(
    public config: InputConfig,
    table: Table,
    private _components: InputComponents
  ) {
    const field = table.fields.find((field) => field.name === config.field)
    if (!field) throw new Error(`Field ${config.field} not found`)
    this.field = field
    const {
      SingleLineTextInput,
      CheckboxInput,
      SingleSelectInput,
      MultipleAttachmentInput,
      LongTextInput,
      EmailInput,
    } = this._components
    const { type } = this.field.config
    switch (type) {
      case 'SingleLineText':
        this.InputComponent = SingleLineTextInput
        break
      case 'LongText':
        this.InputComponent = LongTextInput
        break
      case 'Checkbox':
        this.InputComponent = CheckboxInput
        break
      case 'SingleSelect':
        this.InputComponent = SingleSelectInput
        this.options = this.field.config.options
        break
      case 'MultipleAttachment':
        this.InputComponent = MultipleAttachmentInput
        break
      case 'Email':
        this.InputComponent = EmailInput
        break
      default:
        throw new Error(`Unsupported input type: ${type}`)
    }
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const { field, label, description, placeholder, required, minLength, maxLength } = this.config
    const Input = this.InputComponent
    return (
      <Input
        field={field}
        label={label}
        description={description}
        placeholder={placeholder}
        required={required || this.field.config.required}
        options={this.options}
        minLength={minLength}
        maxLength={maxLength}
      />
    )
  }
}
