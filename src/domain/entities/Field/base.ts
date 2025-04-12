export interface BaseFieldConfig {
  name: string
  required?: boolean
  onMigration?: {
    replace?: string
  }
}

export class BaseField implements BaseFieldConfig {
  name: string
  required?: boolean
  onMigration?: {
    replace?: string
  }

  constructor(config: BaseFieldConfig) {
    this.name = config.name
    this.required = config.required
    this.onMigration = config.onMigration
  }

  get config(): BaseFieldConfig {
    return {
      name: this.name,
      required: this.required,
      onMigration: this.onMigration,
    }
  }
}
