import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table'

export interface InputProps extends React.PropsWithChildren {
  field: string
  type: React.HTMLInputTypeAttribute
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
}

export interface InputConfig {
  field: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
}

export interface InputComponents {
  Input: React.ComponentType<InputProps>
}

export class Input {
  type: React.HTMLInputTypeAttribute

  constructor(
    public config: InputConfig,
    table: Table,
    private _components: InputComponents
  ) {
    const field = table.fields.find((field) => field.name === config.field)
    if (!field) throw new Error(`Field ${config.field} not found`)
    const { type } = field.config
    switch (type) {
      case 'SingleLineText':
        this.type = 'text'
        break
      case 'LongText':
        this.type = 'textarea'
        break
      case 'Email':
        this.type = 'email'
        break
      case 'SingleSelect':
        this.type = 'select'
        break
      case 'MultipleSelect':
        this.type = 'select'
        break
      default:
        throw new Error(`Unsupported field type: ${type}`)
    }
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const { field, label, description, placeholder, required } = this.config
    const { Input } = this._components
    return (
      <Input
        field={field}
        type={this.type}
        label={label}
        description={description}
        placeholder={placeholder}
        required={required}
      />
    )
  }
}
