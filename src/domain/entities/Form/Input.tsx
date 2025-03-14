import type { ConfigError } from '../Error/Config'
import type { Table } from '../Table'

export interface InputConfig {
  field: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
}

export class Input {
  type: React.HTMLInputTypeAttribute

  constructor(
    public config: InputConfig,
    table: Table
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

  render = async (): Promise<React.ReactElement> => {
    const { field, label, description, placeholder, required } = this.config
    return (
      <div key={field}>
        {label ? <label htmlFor={field}>${label}</label> : null}
        {description ? <p>{description}</p> : null}
        <input type={this.type} name={field} placeholder={placeholder} required={required} />
      </div>
    )
  }
}
