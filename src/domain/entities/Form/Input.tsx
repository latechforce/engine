import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table/'
import type {
  Checkbox,
  FileInput,
  AdvancedSelect,
  Textarea,
  Input as InputComponent,
} from '../../components/'
import {
  EmailField,
  SingleLineTextField,
  LongTextField,
  CheckboxField,
  SingleSelectField,
  MultipleAttachmentField,
  SingleAttachmentField,
  type Field,
  UrlField,
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
  Input: InputComponent
  Textarea: Textarea
  Checkbox: Checkbox
  AdvancedSelect: AdvancedSelect
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
    const {
      Input: InputComponent,
      Checkbox,
      AdvancedSelect,
      FileInput,
      Textarea,
    } = this._components
    const props = {
      field: config.field,
      label: config.label,
      description: config.description,
      required: config.required || field.required,
    }
    if (
      field instanceof SingleLineTextField ||
      field instanceof EmailField ||
      field instanceof UrlField
    ) {
      this.Component = () => (
        <InputComponent
          {...props}
          type={field instanceof EmailField ? 'email' : field instanceof UrlField ? 'url' : 'text'}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          minLength={config.minLength}
        />
      )
    } else if (field instanceof LongTextField) {
      this.Component = () => (
        <Textarea
          {...props}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          minLength={config.minLength}
        />
      )
    } else if (field instanceof CheckboxField) {
      this.Component = () => <Checkbox {...props} />
    } else if (field instanceof SingleSelectField) {
      this.Component = () => <AdvancedSelect {...props} options={field.options} />
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

  validate = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const Input = this.Component
    return <Input />
  }
}
