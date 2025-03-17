import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table'
import type { TextInput } from '/domain/components/Form/TextInput'
import type { Input as InputComponent } from '/domain/components/Form/Input'
import type { CheckboxInput } from '/domain/components/Form/CheckboxInput'

export interface InputConfig {
  field: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
}

export interface InputComponents {
  TextInput: TextInput
  CheckboxInput: CheckboxInput
}

export class Input {
  InputComponent: InputComponent

  constructor(
    public config: InputConfig,
    table: Table,
    private _components: InputComponents
  ) {
    const field = table.fields.find((field) => field.name === config.field)
    if (!field) throw new Error(`Field ${config.field} not found`)
    const { TextInput, CheckboxInput } = this._components
    const { type } = field.config
    switch (type) {
      case 'SingleLineText':
        this.InputComponent = TextInput
        break
      case 'Checkbox':
        this.InputComponent = CheckboxInput
        break
      default:
        throw new Error(`Unsupported input type: ${type}`)
    }
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const { field, label, description, placeholder, required } = this.config
    const Input = this.InputComponent
    return (
      <Input
        field={field}
        label={label}
        description={description}
        placeholder={placeholder}
        required={required}
      />
    )
  }
}
