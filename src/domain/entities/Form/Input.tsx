import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table'
import type {
  CheckboxInput,
  FileInput,
  SelectInput,
  TextareaInput,
  TextInput,
} from '/domain/components/Form/Input'
import {
  EmailField,
  SingleLineTextField,
  LongTextField,
  CheckboxField,
  SingleSelectField,
  MultipleAttachmentField,
  SingleAttachmentField,
  type Field,
} from '/domain/entities/Field'

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
  TextInput: TextInput
  TextareaInput: TextareaInput
  CheckboxInput: CheckboxInput
  SelectInput: SelectInput
  FileInput: FileInput
}

export class Input {
  field: Field
  Component: React.ComponentType

  constructor(
    public config: InputConfig,
    table: Table,
    private _components: InputComponents
  ) {
    const field = table.fields.find((field) => field.name === config.field)
    if (!field) throw new Error(`Field ${config.field} not found`)
    this.field = field
    const { TextInput, CheckboxInput, SelectInput, FileInput, TextareaInput } = this._components
    const props = {
      field: config.field,
      label: config.label,
      description: config.description,
      required: config.required || field.required,
    }
    if (field instanceof SingleLineTextField || field instanceof EmailField) {
      this.Component = () => (
        <TextInput
          {...props}
          type={field instanceof EmailField ? 'email' : 'text'}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          minLength={config.minLength}
        />
      )
    } else if (field instanceof LongTextField) {
      this.Component = () => (
        <TextareaInput
          {...props}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          minLength={config.minLength}
        />
      )
    } else if (field instanceof CheckboxField) {
      this.Component = () => <CheckboxInput {...props} />
    } else if (field instanceof SingleSelectField) {
      this.Component = () => <SelectInput {...props} options={field.options} />
    } else if (field instanceof MultipleAttachmentField) {
      this.Component = () => (
        <FileInput {...props} multiple={true} placeholder={config.placeholder} />
      )
    } else if (field instanceof SingleAttachmentField) {
      this.Component = () => (
        <FileInput {...props} multiple={false} placeholder={config.placeholder} />
      )
    } else {
      throw new Error(`Unsupported input type: ${field.constructor.name}`)
    }
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const Input = this.Component
    return <Input />
  }
}
