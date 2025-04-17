export interface BaseFieldConfig {
  name: string
  required?: boolean
}

export class BaseField implements BaseFieldConfig {
  name: string
  required?: boolean

  constructor(config: BaseFieldConfig) {
    this.name = config.name
    this.required = config.required
  }

  get config(): BaseFieldConfig {
    return {
      name: this.name,
      required: this.required,
    }
  }
}
